import React, { createContext, useEffect, useState } from 'react';
import { gql } from 'apollo-boost';
import { Cookie } from 'next-cookie';

import client from '../services/api'

interface User {
  id: string,
  nome: string;
  email: string;
  token: string;
}

const LOGIN_USER = gql`
  mutation LoginUser ($email: String!, $password: String!){
    loginUser(data: { email: $email, password: $password }){
      name,
      email,
      token,
      createdAt,
      favoritos{
        id,
        title,
        popularity,
        poster_path,
        backdrop_path,
        release_date,
        createdAt,
        overview
      }
    }
  }
`;

//interface com todos os dados necessarios
interface AuthContextData {
  signed: boolean;
  user: User | null;
  //signUp(user: object): Promise<object>;
  signIn(user: object): Promise<object>;
  signOut(): boolean;
}

//criando context com tipo da interface acima
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

//criando provedor que servirá a aplicação
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadStorageData() {
      const cookie = new Cookie();
      const userCookie: User = cookie.get('user');

      if (userCookie) {
        setUser(userCookie);
      }
    }

    loadStorageData();
  }, []);

  //função que realiza o cadastro
  async function signUp(usuario: object){
    /*const response = await API.post('/register', usuario);
    const data = await response.data;

    const cookie = new Cookie();
    cookie.set('user', data);

    setUser(data);

    return data;*/
  }

  //função que realiza o login
  async function signIn(usuario: any){
    const { data } = await client.mutate({
      variables: { email: usuario.email, password: usuario.password },
      mutation: LOGIN_USER,
    })

    const cookie = new Cookie();
    cookie.set('user', data);
    setUser(data);

    return data;
  }

  //função que realiza o login
  function signOut(): boolean{
    try{
      const cookie = new Cookie();
      cookie.remove('user')
      setUser(null);

      return true;
    } catch(error){
      console.log('erro ao fazer logout')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        //signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

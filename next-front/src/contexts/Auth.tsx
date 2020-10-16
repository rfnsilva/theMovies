import React, { createContext, useEffect, useState } from 'react';
import API from '../config/Api';
import { Cookie } from 'next-cookie';

interface User {
  id: string,
  nome: string;
  email: string;
  token: string;
}

//interface com todos os dados necessarios
interface AuthContextData {
  signed: boolean;
  user: User | null;
  //signUp(user: object): Promise<object>;
  //signIn(user: object): Promise<object>;
  forgot(user: object): Promise<object>;
  signOut(): boolean;
}

//criando context com tipo da interface acima
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

//criando provedor que servirá a aplicação
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  /*useEffect(() => {
    async function loadStorageData() {
      const cookie = new Cookie();
      const userCookie: User = cookie.get('user');

      if (userCookie) {
        setUser(userCookie);
      }
    }

    loadStorageData();
  }, []);*/

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
  async function signIn(usuario: object){
    /*const response = await API.post('/login', usuario);
    const data = await response.data;

    const cookie = new Cookie();
    cookie.set('user', data);

    setUser(data);

    return data;*/
  }

  //função que realiza o forgot
  async function forgot(usuario: object){
    const response = await API.post('/forgot', usuario);
    const data = await response.data;

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
        //signIn,
        forgot,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

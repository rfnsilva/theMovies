import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { useQuery, useMutation, gql } from '@apollo/client';;
import Link from 'next/link'

import AuthContext from '../../contexts/Auth';

import { MenuForm, Container, Options } from './styles';

interface User {
  email: string,
  password: string
}

const LOGIN_USER = gql`
  mutation($email: string, $password: string){
    loginUser(data: {
      email: $email,
      password: $password
    }){
      email,
      token
    }
  }
`;
const LoginComponent: React.FC = () => {
  const router = useRouter();
  const [ usuario, setUsuario] = useState<User>(null)

  const [loginUser, { data }] = useMutation(LOGIN_USER);

  //context com a metodo que sera usado para realizar o cadastro
  //const { signIn } = useContext(AuthContext);

  //subimit form
  const SubmitForm = async () => {
    try{
      loginUser({ variables: { email: usuario.email ,password: usuario.password } });
      //const response = await signIn(usuario);

      console.log(data)

      //verificar response
      if(data){
        router.push('/user/dashboard');
      }
      else{
        console.log('erro no response !') //tratar este erro mais tarde
      }
    } catch(error){
      console.log(error)
    }

  };

  const handleChange = async({ target }) => {
    setUsuario({
      ...usuario,
      [target.name]: target.value
    })
  }

  return (
    <>
      <Container>
        <h1>Login</h1>

        <MenuForm>
          <input type="email" placeholder="email pessoal" name="email" onChange={handleChange} />
          <input type="password" placeholder="senha" name="senha" onChange={handleChange} />

          <button onClick={SubmitForm} type="submit">Login</button>
        </MenuForm>

        <Options>

          <Link href='/cadastrar'>
            <a>cadastrar</a>
          </Link>

          <Link href='/forgot'>
            <a>forgot</a>
          </Link>

        </Options>
      </Container>
    </>
  );
}

export default LoginComponent;

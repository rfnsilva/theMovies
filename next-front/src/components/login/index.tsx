import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import client from '../../services/api'

import AuthContext from '../../contexts/Auth';

import { MenuForm, Container, Options } from './styles';
import { gql } from 'apollo-boost';

interface User {
  email: string,
  password: string
}

const LOGIN_USER = gql`
  mutation LoginUser ($email: String!, $password: String!){
    loginUser(data: { email: $email, password: $password }){
      email,
      token
    }
  }
`;

const LoginComponent: React.FC = () => {
  const router = useRouter();
  const [ usuario, setUsuario] = useState<User>(null)

  //subimit form
  const SubmitForm = async () => {
    try{

      const { data } = await client.mutate({
        variables: { email: usuario.email, password: usuario.password },
        mutation: LOGIN_USER,
      })

      if(data){
        router.push('/');
      }

      console.log(data)
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
          <input type="password" placeholder="password" name="password" onChange={handleChange} />

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

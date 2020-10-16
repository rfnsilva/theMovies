import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'

import AuthContext from '../../contexts/Auth';

import { MenuForm, Container, Options } from './styles';

interface User {
  email: string,
  password: string
}

const LoginComponent: React.FC = () => {
  const router = useRouter();
  const [ usuario, setUsuario] = useState<User>(null)
  const { signIn } = useContext(AuthContext)

  //subimit form
  const SubmitForm = async () => {
    try{
      const data = await signIn(usuario);

      if(data){
        router.push('/');
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

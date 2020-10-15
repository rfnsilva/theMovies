import React, { useState } from 'react';
import { useRouter } from 'next/router'

import { Container } from './styles';

export default function Input() {
  const router = useRouter();
  const [ search, setSearch ] = useState<string>(null)

  //subimit form
  async function Search() {
    try{
      router.push(`/search/${search}`)
    } catch(error){
      console.log(error)
    }

  };

  const handleChange = async({ target }) => {
    setSearch(target.value)
  }

  return (
    <Container>
      <div className="input-group">
        <input type="text" className="form-control" onChange={handleChange} placeholder="Pesquisar" aria-label="Pesquisar" />
      </div>

      <button onClick={Search} type="submit">pesquisar</button>
    </Container>
  );
}

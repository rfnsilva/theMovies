import styled from 'styled-components';

// BU - input de busca
// RB - resultado da busca
// MA - main

export const Container = styled.div`
  //display: flex;
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-areas:
    'BU BU'
    'MA MA';
  height: 100vh;

  > div {
    grid-area: MA;
    display: flex;
  }

  @media(max-width: 700px) {
    grid-template-columns: 0 auto;
  }

`;

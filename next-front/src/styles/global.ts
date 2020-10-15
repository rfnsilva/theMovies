import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    max-width: 100vw;
    max-height: 100vh;
    width: 100%;
    height: 100%;
  }
  *, button, input, a {
    border: none;
    outline: 0;
    text-decoration: none;
  }
  body {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.text};
    font: 400 16px Roboto, sans-serif;
  }
`;

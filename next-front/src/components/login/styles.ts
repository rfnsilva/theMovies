import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 31px 30px 5px 30px;
  background-color: #fff;

  h1 {
    color: ${props => props.theme.colors.primary}
  }
  @media(max-width: 600px){
    margin: 0 10px;
  }
`;

export const MenuForm = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  max-width: 500px;
  width: 419px;
  @media(max-width: 500px){
    width: 337px;
  }
  padding: 20px 20px 0px;
  >input {
    outline: none;
    margin-bottom: 24px;
    border-radius: 5px;
    padding: 18px 13px;
    border: none;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25), 0px 1px 3px rgba(0, 0, 0, 0.02);
  }
  >button {
    outline: none;
    margin: 18px auto;
    padding: 10px 24px;
    width: 160px;
    background-color: ${props => props.theme.colors.primary};
    color: #fff;
    border: none;
    cursor:pointer;
  }
`;

export const Options = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  > a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
  }
`;

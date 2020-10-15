import styled from 'styled-components';

export const Container = styled.div`
  grid-area: MA;
  max-width: 400px;
  max-height: 600px;
  height: 450px;
  padding: 61px 0 20px 20px;

  @media(max-width: 700px) {
    display: none;
  }
`;

export const Wrapper = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  box-shadow: 0px 0px 7px 2px rgba(0,0,0,0.2);
`;

export const Title = styled.div`
  background-color: #5ac2e8;
  padding: 20px;
  border-radius: 20px 20px 0 0;
  > h1 {
    font-size: 24px;
    text-align: center;
    color: ${props => props.theme.colors.white};
  }
`;

export const Results = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    margin-bottom: 9px;
    > a {
      font-size: 20px;
      padding: 10px 57px;
      cursor: pointer;
      color: ${props => props.theme.colors.title};
      text-decoration: none;

      &:hover {
        background-color: #d1d1d1
      }
    }

    > span {
      font-size: 20px;
      padding: 10px 42px;
      color: ${props => props.theme.colors.title};
    }
  }
`;

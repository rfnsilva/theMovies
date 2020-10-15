import styled from 'styled-components';

export const CardStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;

  margin: 22px;
  box-shadow: 0px 0px 7px 2px rgba(0,0,0,0.2);
  border-radius: 14px;

  > img {
    border-radius: 14px 14px 0 0;
  }
`;

export const Description = styled.div`
  display: flex;
  padding: 12px;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;

    > h1 {
      font-size: 1.3rem;
      font-weight: bold;
      color: ${ props => props.theme.colors.title }
    }

    > h2 {
      font-size: .8rem;
      font-weight: bold;
      margin: -7px 0 13px 0;
      color: ${ props => props.theme.colors.data }
    }
  }
`;

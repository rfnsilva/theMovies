import styled from 'styled-components';

export const Container = styled.div`
  grid-area: MA;

  margin: 35px 16px;

  > section {
    display: flex;
    overflow-x: scroll;
  }

  > div {
    padding-left: 40px;
    padding-right: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;

    > h2 {
      margin-right: 20px;
      white-space: nowrap;
      font-size: 1.5em;
      font-weight: 600;
      color: ${props => props.theme.colors.title}
    }

    > div {
      > div {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        align-content: center;
        border: 1px solid rgb(9 38 66);
        border-radius: 30px;

        > div {
          position: relative;
          top: 0;
          left: 0;
          z-index: 1;

          > h3 {
            display: inline-flex;
            align-content: center;
            align-items: center;
            justify-content: center;
            font-size: 1em;
            padding: 4px 20px;
            margin-bottom: 0;
            white-space: nowrap;
          }
        }
      }
    }
  }

  @media(max-width: 800px){
    margin-left: 0 !important;
  }
`;

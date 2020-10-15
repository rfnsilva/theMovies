import styled from 'styled-components';

export const Container = styled.div`
  //display: flex;
  //flex-wrap: wrap;
  grid-area: MA;
  //height: 450px;
  overflow-x: scroll;

  //justify-content: center;
  margin: 35px 16px;

  > section {
    display: flex;
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

  /*> nav {
    > ul {
      display: flex;
      padding-left: 0;
      list-style: none;
      border-radius: .25rem;

      > li {
        > button {
          position: relative;
          display: block;
          padding: .5rem .75rem;
          margin-left: -1px;
          line-height: 1.25;
          color: #007bff;
          background-color: #fff;
          border: 1px solid #dee2e6;
        }
      }
    }
  }*/

  @media(max-width: 800px){
    margin-left: 0 !important;
  }
`;


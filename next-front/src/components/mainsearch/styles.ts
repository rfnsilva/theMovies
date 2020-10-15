import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-area: MA;

  justify-content: center;
  margin: 35px 16px;

  > nav {
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
  }

  @media(max-width: 800px){
    margin-left: 0 !important;
  }
`;


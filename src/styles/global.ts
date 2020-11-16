import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import loadingSpinner from '../assets/loading.svg';


export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

    body {
      background: #f5f5fa;
      color: #3D3D4D;
      -webkit-font-smoothin: antialiased;
    }
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5 , h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;

export const Loading = styled.div`
  background: url(${loadingSpinner}) no-repeat center;
  color: transparent;
  height: 80px;
  background-size: 10%;
`;

export const LoadingContainer = styled.div`
  border: 1px solid black;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  background: #fff;
  font-size: 15px;
  border-radius: 10px;
  border: 2px solid #eeeef6;
  margin-top: 20px;
  height: 200px;
`;

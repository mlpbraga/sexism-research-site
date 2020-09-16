import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import backgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  flex:1;
  
  @media(max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 50px;
  max-width: 700px;

  @media(max-width: 900px) {
    margin: 0px; 
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimatedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-arround;
  align-items: center;
  flex:1;

  // animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #DC73A5;
    display: flex;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#DC73A5')};
    }

    svg {
      margin-right: 6px;
    }
  }
`;

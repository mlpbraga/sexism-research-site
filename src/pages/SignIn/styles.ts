import styled from 'styled-components';
import { shade } from 'polished';
import backgroundImg from '../../assets/sex.png';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  @media (min-width: 901px) {
    max-height: 800px;
  }
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const Background = styled.div`
  position: absolute;
  background-size: 100%;
  width: 100%;
  z-index: -2;
  height: 100%;
  opacity: 0.09;
  background: url(${backgroundImg}) no-repeat left bottom;
  
  @media (max-width: 900px) {
    width: 0;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 50px;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-arround;
  align-items: center;
  flex: 1;

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
    color: #dc73a5;
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
  @media (max-width: 900px) {
    margin: 0px;
    flex-direction: column;
    flex: 1;
  }
`;

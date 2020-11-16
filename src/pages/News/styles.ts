import styled from 'styled-components';
import { shade } from 'polished';
import loadingSpinner from '../../assets/loading.svg';

export const Container = styled.div`
  justify-content: space-between;
  margin: 20px auto 0;
  padding: 20px;
  text-align: center;
  align-items: center;
  max-width: 900px;

  p {
    margin: 20px auto 0;
    text-align: center;
  }

  ul {
    margin-top: 20px;
    a {
      text-decoration: none;
      color: #3d3d4d;
    }
  }
`;

export const New = styled.div`
  border: 1px solid black;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  background: #fff;
  font-size: 15px;
  border-radius: 10px;
  border: 2px solid #eeeef6;

  li {
    list-style-type: none;
    align-items: center;
    flex: 1;
    padding-bottom: 10px;
    small {
      color: #a6a6a6;
    }
    a {
      color: #b05c84;
    }
    p {
      color: #3d3d4d;
    }
  }
  & + a {
    margin-top: 16px;
  }
  &:hover {
    transform: translateX(4px);
    background: ${shade(0.04, '#eeeef6')};
  }
`;

export const Loading = styled.div`
  background: url(${loadingSpinner}) no-repeat center;
  color: transparent;
  height: 80px;
  background-size: 10%;
  z-index: -2;
`;

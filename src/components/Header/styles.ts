import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.header`
  width: 100%;
  color: #fff;
  background-color: #e6cbd8;

  img {
  }
  a {
    cursor: pointer;
    text-decoration: underline;
    font-weight: normal;
    font-size: 16px;
    color: #dc73a5;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  font-size: 22px;
  margin: 0 auto;
  padding: 5px 20px;
  font-weight: bold;

  div a {
    margin-right: 20px;
    text-decoration: none;
    font-weight: bold;
  }
  div a:hover {
    color: ${shade(0.2, '#DC73A5')};
  }

`;

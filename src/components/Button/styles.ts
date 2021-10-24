import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #dc73a5;
  height: 56px;
  border-radius: 10px;
  border: 0;
  color: #f5f5fa;
  padding: 0 16px;
  width: 100%;
  max-width: 150px;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#DC73A5')};
  }

  &:disabled {
    background: ${shade(0.1, '#8d8d8d')};
  }

  @media (max-width: 900px) {
    margin: 5px auto 0;
    padding: 5px;
  }
`;

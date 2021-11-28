import styled from 'styled-components';

export const Container = styled.div`
  justify-content: space-between;
  margin: 20px auto 0;
  padding: 20px;
  text-align: center;
  align-items: center;
  max-width: 1000px;

  p {
    margin: 20px auto 0;
    text-align: center;
  }
  @media (max-width: 900px) {
    margin: 5px auto 0;
    padding: 5px;
  }
`;

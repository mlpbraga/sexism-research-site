import styled from 'styled-components';

export const Container = styled.div`
  flex-direction: column;
  flex:1;
  align-items: center;
  width: auto;
  max-width: 900px;
  margin: 20px 100px 20px 100px;
  text-align: justify;

  div {
    border: 1px solid #f5f5fa;
    background: #fff;
    border-radius: 10px;
    margin: 10px 0;
    padding: 0 20px;

    h1 {
      margin-bottom: 25px;
      color: #DC73A5;
    }

    p {
      margin-bottom: 15px
    }
  }

  @media(max-width: 900px) {
    flex-direction: column;
    min-width: auto;
    flex1;
    margin: 20px;
  }
`;

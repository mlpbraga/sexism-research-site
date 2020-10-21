import styled from 'styled-components';

export const Container = styled.footer`
  width: 100%;
  max-width: 900px;
  bottom: 0;
  left: 0;
  margin: 0 auto 20px auto;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RightBlock = styled.div`
  text-align: end;
`;

export const TextRightIcon = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 4px;
  }
`;

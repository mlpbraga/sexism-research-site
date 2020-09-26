import styled from 'styled-components';

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
  }
`;

export const Comment = styled.div`
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
    small {
      color: #a6a6a6;
    }
    #comment-engagement {
      margin: 10px 0;
      align-self: center;
      display: flex;
      flex-direction: row;
      justify-content: center;

      #thumbs {
        display: flex;
        flex-direction: row;

        p {
          margin: 0 12px 0 4px;
        }
      }
    }
  }
`;

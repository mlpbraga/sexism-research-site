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

  h3 {
    color: #a6a6a6;
  }

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
  padding: 10px;

  li {
    list-style-type: none;
    align-items: center;
    flex: 1;
    small {
      color: #a6a6a6;
      a {
        color: #b05c84;
        &:visited {
          color: ${shade(0.04, '#b05c84')};
        }
        &:-webkit-any-link {
          color: ${shade(0.04, '#b05c84')};
        }
      }
    }
    div {
      border-radius: 4px;
      #not-sexist {
        background-color: #d1edd8;
        color: #51735a;
      }
      #sexist {
        background-color: #edd1d1;
        color: #735151;
      }
    }

    #vote-distirbution-box {
      margin: 20px auto 0;
      background-color: #f5f5fa;
      padding: 5px;
      display: flex;
      flex-direction: column;
      max-width: 400px;

      #vote-distirbution {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        p {
          margin: 0;
        }
      }
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

export const Loading = styled.div`
  background: url(${loadingSpinner}) no-repeat center;
  color: transparent;
  height: 80px;
  background-size: 10%;
`;

export const RadioInput = styled.div`
  background: #f5f5fa;
  border-radius: 10px;
  border: 2px solid #f5f5fa;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

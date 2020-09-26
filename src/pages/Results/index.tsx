import React, { useState, useRef, useCallback } from 'react';
import { FiSearch, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Comment } from './styles';

import api from '../../services/api';

interface SearchFormData {
  query: string;
  sexist: boolean;
  notSexist: boolean;
  notDefined: boolean;
}

const Results: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [comments, setComments] = useState([
    {
      commentId: 1,
      content: 'Blebleb dsaaaaaaaaaa adddddddddddd addddddddd daaaaaaelbel',
      votes: {
        sexist: 12,
        not: 192,
      },
      likes: 13,
      dislikes: 14,
      reply: 'Blubleublue',
    },
    {
      commentId: 2,
      content: 'Bleblebelbel',
      votes: {
        sexist: 12,
        not: 192,
      },
      likes: 13,
      dislikes: 14,
      reply: 'Blubleublue',
    },
    {
      commentId: 3,
      content: 'Bleblebelbel',
      votes: {
        sexist: 12,
        not: 192,
      },
      likes: 13,
      dislikes: 14,
      reply: 'Blubleublue',
    },
    {
      commentId: 4,
      content: 'Bleblebelbel',
      votes: {
        sexist: 12,
        not: 192,
      },
      likes: 13,
      dislikes: 14,
      reply: 'Blubleublue',
    },
    {
      commentId: 5,
      content: 'Bleblebelbel',
      votes: {
        sexist: 12,
        not: 192,
      },
      likes: 13,
      dislikes: 14,
      reply: 'Blubleublue',
    },
  ]);

  const handleSubmit = useCallback(async (data: SearchFormData) => {
    try {
      const response = await api.get('/search/comments');
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="search" icon={FiSearch} placeholder="Buscar palavra" />
          <Button>Filtrar</Button>
        </Form>
        <ul>
          {comments.map(comment => (
            <Comment key={comment.commentId}>
              <li>
                <div>
                  <p>"{comment.content}"</p>
                  <small>
                    Esse comentário foi uma resposta ao comentário "
                    {comment.reply}"
                  </small>
                </div>
                <div id="comment-engagement">
                  <div id="thumbs">
                    <FiThumbsUp color="#1381a2" />
                    <p>{comment.likes}</p>
                  </div>
                  <div id="thumbs">
                    <FiThumbsDown color="#ff6e83" />
                    <p>{comment.dislikes}</p>
                  </div>
                </div>
              </li>
            </Comment>
          ))}
        </ul>
      </Container>
    </>
  );
};

export default Results;

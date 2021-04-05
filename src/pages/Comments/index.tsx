import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiSearch, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Comment, Loading, RadioInput } from './styles';

import api from '../../services/api';
import CommentsProxy from '../../services/api/comments';

interface SearchFormData {
  q: string;
  // sexist: boolean;
  // notSexist: boolean;
  // notDefined: boolean;
}

interface CommentData {
  commentId: number;
  content: string;
  replyTo: string;
  newsId: number;
  label: number;
  votes: {
    sexist: number;
    notSexist: number;
    total: number;
  };
  likes: number;
  dislikes: number;
}

interface NewsData {
  newsId: number;
  title: string;
  link: string;
  deleted: boolean;
}

interface Params {
  newsId: string;
}

const decodeHTML = (text: string): string => {
  const txt = document.createElement('textarea');
  txt.innerHTML = text;
  return txt.value;
};

const Comments: React.FC = () => {
  const { newsId } = useParams<Params>();
  const formRef = useRef<FormHandles>(null);
  const [label, setLabel] = useState('');
  const [comments, setComments] = useState<Array<CommentData>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [news, setNews] = useState<NewsData>({} as NewsData);
  const limit = 25;

  const handlePagination = useCallback(async () => {
    try {
      const response = await CommentsProxy.get({
        newsId,
        query,
        limit,
        offset,
      });
      setComments(oldValue => [...oldValue, ...response]);
      setLoadingMore(false);
    } catch (error) {
      console.log(error);
    }
  }, [offset, newsId, query]);

  const handleSearch = async (data: SearchFormData): Promise<void> => {
    setIsLoading(true);
    try {
      const { q } = data;
      setOffset(0);
      setQuery(q);
      const response = await CommentsProxy.get({
        newsId,
        query,
        limit,
        offset,
        label,
      });
      setComments(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadInfo = async (): Promise<void> => {
      try {
        setOffset(0);
        const newsResponse = await api.get<NewsData>(`/news/${newsId}`);
        setNews(newsResponse.data);
        const response = await CommentsProxy.get({
          newsId,
          query,
          limit,
          offset,
        });
        setComments(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    loadInfo();
  }, [newsId, offset, query]);

  return (
    <>
      <Header />
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
          <Comment>
            <div>
              <h3> Exibindo comentários para a notícia:</h3>
              <h1>{news.title}</h1>
              <small>
                {`Acesse a notícia em `}
                <a target="_blank" rel="noopener noreferrer" href={news.link}>
                  {news.link.substring(0, 20)}...
                </a>
              </small>
            </div>
          </Comment>
        )}
        {/* TODO: IMPLEMENT COMMENTS SEARCH */}
        <Form ref={formRef} onSubmit={handleSearch}>
          <Input name="q" icon={FiSearch} placeholder="Buscar palavra" />
          {/* TODO: implement filter by label */}
          <RadioInput>
            <label className="radio-label">
              <b>Rótulo </b>
            </label>
            <div className="signup-input-radio">
              <input
                type="radio"
                name="label"
                value="sexist"
                checked={label === 'sexist'}
                onChange={event => {
                  setLabel(event.target.value);
                }}
              />
              <label className="radio-label"> sexistas </label>
            </div>
            <div className="signup-input-radio">
              <input
                type="radio"
                name="label"
                value="not-sexist"
                checked={label === 'not-sexist'}
                onChange={event => {
                  setLabel(event.target.value);
                }}
              />
              <label className="radio-label"> não sexistas </label>
            </div>
            <div className="signup-input-radio">
              <input
                type="radio"
                name="label"
                value=""
                checked={label === ''}
                onChange={event => {
                  setLabel(event.target.value);
                }}
              />
              <label className="radio-label"> todos </label>
            </div>
          </RadioInput>
          <Button type="submit">Filtrar</Button>
        </Form>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <ul>
              {comments.map(comment => (
                <Comment key={comment.commentId}>
                  <li>
                    <div>
                      <p>
                        <b>{`C${comment.commentId}: `}</b>
                        {`"${comment.content}"`}
                      </p>
                      {comment.replyTo && comment.replyTo !== ' ' && (
                        <small>
                          {`Esse comentário foi uma resposta ao comentário "${decodeHTML(
                            comment.replyTo,
                          )}"`}
                        </small>
                      )}
                    </div>
                    <div id="comment-engagement">
                      <div id="thumbs">
                        <FiThumbsUp color="#1381a2" />
                        <p>{comment.likes || 0}</p>
                      </div>
                      <div id="thumbs">
                        <FiThumbsDown color="#ff6e83" />
                        <p>{comment.dislikes || 0}</p>
                      </div>
                    </div>
                    <div id="vote-distirbution-box">
                      <b>Votos atribuídos por classe </b>
                      <div id="vote-distirbution">
                        <p>{`sexista: ${comment.votes.sexist}`}</p>
                        <p>{`não sexista: ${comment.votes.notSexist}`}</p>
                        <p>{`total: ${comment.votes.total}`}</p>
                      </div>
                      {comment.votes.notSexist !== comment.votes.sexist && (
                        <div
                          id={
                            comment.votes.notSexist < comment.votes.sexist
                              ? 'sexist'
                              : 'not-sexist'
                          }
                        >
                          {comment.votes.notSexist < comment.votes.sexist
                            ? `sexista`
                            : `não sexista`}
                        </div>
                      )}
                    </div>
                  </li>
                </Comment>
              ))}
            </ul>
            {loadingMore ? (
              <Loading />
            ) : (
              <Button
                onClick={() => {
                  setLoadingMore(true);
                  setOffset(oldValue => oldValue + limit);
                  handlePagination();
                }}
              >
                Carregar mais
              </Button>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Comments;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiSearch, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Comment, Loading } from './styles';

import api from '../../services/api';

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
  const [comments, setComments] = useState<Array<CommentData>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [news, setNews] = useState<NewsData>({} as NewsData);
  const limit = 25;

  const handlePagination = useCallback(async () => {
    try {
      let url = newsId
        ? `/comments?newsId=${newsId}&limit=${limit}&offset=${offset + limit}`
        : `/comments?limit=${limit}&offset=${offset + limit}`;
      if (query) {
        url += `&query=${query}`;
      }
      const response = await api.get(url);
      setComments(oldValue => [...oldValue, ...response.data]);
      setLoadingMore(false);
    } catch (error) {
      console.log(error);
    }
  }, [offset, newsId, query]);

  const handleSearch = useCallback(
    async (data: SearchFormData) => {
      try {
        const { q } = data;
        setOffset(0);
        setQuery(q);
        const url = newsId
          ? `/comments?newsId=${newsId}&limit=${limit}&offset=0&query=${q}`
          : `/comments?limit=${limit}&offset=0&query=${q}`;
        const response = await api.get(url);
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    [newsId],
  );

  useEffect(() => {
    const loadInfo = async (): Promise<void> => {
      try {
        setOffset(0);
        const newsResponse = await api.get<NewsData>(`/news/${newsId}`);
        setNews(newsResponse.data);
        let url = newsId
          ? `/comments?newsId=${newsId}&limit=${limit}&offset=0`
          : '/comments?limit=10&offset=0';
        if (query) {
          url += `&query=${query}`;
        }
        const response = await api.get<Array<CommentData>>(url);
        setComments(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    loadInfo();
  }, [query, newsId]);

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

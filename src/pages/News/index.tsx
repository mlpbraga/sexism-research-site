import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, New, Loading } from './styles';

import api from '../../services/api';

interface SearchFormData {
  query: string;
}

interface NewsResponse {
  newsId: number;
  title: string;
  deleted: boolean;
  link: string;
}

const News: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [news, setNews] = useState<Array<NewsResponse>>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadInfo = async (): Promise<void> => {
      try {
        const response = await api.get<Array<NewsResponse>>('/news');
        setNews(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    loadInfo();
  }, []);

  const handleSearch = useCallback(async (data: SearchFormData) => {
    try {
      const { query } = data;
      const response = await api.get(`/news?query=${query}`);
      setNews(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <h1> Notícias coletadas</h1>
        <Form ref={formRef} onSubmit={handleSearch}>
          <Input name="search" icon={FiSearch} placeholder="Buscar palavra" />
          <Button type="submit">Filtrar</Button>
        </Form>
        {isLoading ? (
          <Loading />
        ) : (
          <ul>
            {news.map(title => (
              <New key={title.newsId}>
                <li>
                  <div>
                    <Link to={`/comments/${title.newsId}`}>
                      <p>
                        <b>{`N${title.newsId}: `} </b>
                        {`"${title.title}"`}
                      </p>
                    </Link>
                    <small>
                      {`Acesse a notícia em `}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={title.link}
                      >
                        {title.link.substring(0, 20)}...
                      </a>
                    </small>
                  </div>
                </li>
              </New>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
};

export default News;

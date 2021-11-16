import React, { useState, useEffect, useCallback } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import Button from '../../components/Button';
import {
  Container,
  Content,
  Loading,
  VoteOptions,
  SkipOption,
  RadioButton,
  UserProgress,
  Reply,
} from './styles';
import api from '../../services/api';

import { useToast } from '../../context/toast';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import textData from './text.json';

interface CommentData {
  commentId: number;
  newsTitle: string;
  newsUrl: string;
  commentContent: string;
  replyTo: string;
  description: string;
}

interface CommentsResponse {
  commentId: number;
  News: {
    title: string;
    link: string;
    description: string;
  };
  content: string;
  replyTo: string;
}

interface UserData {
  username: string;
  name: string;
  gender: string;
  countVotes: number;
}

interface UsersMeResponse {
  username: string;
  email: string;
  name: string;
  birth: string;
  gender: string;
  countVotes: number;
}

const decodeHTML = (text: string): string => {
  const txt = document.createElement('textarea');
  txt.innerHTML = text;
  return txt.value;
};

const Dashboard: React.FC = () => {
  const { addToast } = useToast();
  const [showExemples, setShowExamples] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadComment, setReloadComment] = useState(false);
  const [vote, setVote] = useState('');
  const [userLoaded, setUserLoaded] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    username: '',
    name: '',
    gender: '',
    countVotes: 0,
  });
  const [commentData, setCommentData] = useState<CommentData>({
    commentId: 0,
    newsTitle: '',
    newsUrl: '',
    commentContent: '',
    replyTo: '',
    description: '',
  });
  const showReply = commentData.replyTo !== ' ' && commentData.replyTo !== '';

  const handleVote = useCallback(
    async (voteValue: string) => {
      try {
        await api.post('/votes', {
          commentId: commentData.commentId,
          voteValue,
        });

        setReloadComment(!reloadComment);
        setUserData(now => ({
          ...userData,
          countVotes: now.countVotes + 1,
        }));
      } catch (error) {
        addToast({
          title: 'Falha ao enviar o voto',
          type: 'error',
        });
      }
    },
    [commentData.commentId, reloadComment, userData, addToast],
  );

  useEffect(() => {
    const loadInfo = async (): Promise<void> => {
      try {
        const myUserRequest = await api.get<UsersMeResponse>('/users/me');
        const myUser = myUserRequest.data;
        setUserData({
          username: myUser.username,
          countVotes: myUser.countVotes,
          name: myUser.name,
          gender: myUser.gender,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUserLoaded(true);
      }
    };

    loadInfo();
  }, []);

  useEffect(() => {
    const loadInfo = async (): Promise<void> => {
      try {
        const response = await api.get<CommentsResponse>('/comments/random');
        const comment = response.data;

        setCommentData({
          commentId: comment.commentId,
          newsTitle: decodeHTML(comment.News.title),
          newsUrl: comment.News.link,
          commentContent: decodeHTML(comment.content),
          replyTo: decodeHTML(comment.replyTo),
          description: decodeHTML(comment.News.description),
        });
        setIsLoading(false);
        setVote('');
      } catch (error) {
        console.log(error);
      }
    };

    loadInfo();
  }, [reloadComment]);

  const votesPercentage = (): string => {
    return (100 * (userData.countVotes / 3588)).toFixed(2);
  };
  return (
    <>
      <Header />
      <Container>
        {userLoaded && (
          <UserProgress>
            <p>
              {userData.gender === 'fem'
                ? textData.welcome.f
                : textData.welcome.m}{' '}
              {userData.name}
              {textData.progress.replace('{x}', String(userData.countVotes))}
            </p>
            <ProgressBar
              completed={votesPercentage()}
              borderRadius="6px"
              bgColor="#DC70A3"
              baseBgColor="#f1eaf2"
              customLabel={`${votesPercentage()} %`}
            />
            <small>{textData.progressDetails}</small>
          </UserProgress>
        )}
        <Content>
          <header>
            <strong>Conceito de sexismo</strong>
          </header>
          <p>{textData.concept}</p>
          {showExemples && (
            <div>
              <p>{textData.examples[0]}</p>
              <p>{textData.examples[1]}</p>
              <p>{textData.examples[2]}</p>
              <p>{textData.examples[3]}</p>
            </div>
          )}
          <button
            type="button"
            id="show-more"
            onClick={() => setShowExamples(!showExemples)}
          >
            {showExemples ? 'Esconder exemplos' : 'Mostrar exemplos'}
          </button>
        </Content>
        <Content>
          <header>
            <strong>Título da notícia</strong>
          </header>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <h2>{commentData.newsTitle}</h2>
              {commentData.description && commentData.description}
              Leia o conteúdo da notícia em{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={commentData.newsUrl}
              >
                {commentData.newsUrl.substring(0, 20)}...
              </a>
            </>
          )}
        </Content>
        <Content>
          <header>
            <strong>Comentário em avaliação</strong>
          </header>
          {isLoading ? (
            <Loading />
          ) : (
            <p>
              <b>{`C${commentData.commentId}: `}</b>
              {`"${commentData.commentContent}"`}
            </p>
          )}
          {showReply && (
            <Reply> {`${textData.reply} "${commentData.replyTo}"`} </Reply>
          )}
          {!isLoading && (
            <>
              <p>{textData.question}</p>
              <VoteOptions>
                <RadioButton isChecked={vote === 's'} htmlFor="vote-yes">
                  <input
                    id="vote-yes"
                    type="radio"
                    name="vote-yes"
                    value="s"
                    checked={vote === 's'}
                    onChange={() => setVote('s')}
                  />
                  SEXISTA
                </RadioButton>
                <RadioButton isChecked={vote === 'n'} htmlFor="vote-no">
                  <input
                    id="vote-no"
                    type="radio"
                    name="vote-no"
                    value="n"
                    checked={vote === 'n'}
                    onChange={() => setVote('n')}
                  />
                  NÃO SEXISTA
                </RadioButton>
              </VoteOptions>
              <VoteOptions>
                <Button
                  onClick={() => {
                    setIsLoading(true);
                    handleVote(vote);
                  }}
                >
                  ENVIAR VOTO
                </Button>
              </VoteOptions>

              <SkipOption>
                <a href="/">Pular por enquanto...</a>
              </SkipOption>
            </>
          )}
        </Content>
        <Footer />
      </Container>
    </>
  );
};

export default Dashboard;

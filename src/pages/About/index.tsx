import React from 'react';
import About from '../../components/About';
import Header from '../../components/Header';
import { Container } from './styles';

const Comments: React.FC = () => (
  <>
    <Header />
    <Container>
      <About />
    </Container >
  </>
);


export default Comments;

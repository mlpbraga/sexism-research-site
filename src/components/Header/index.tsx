import React from 'react';

import { Container, HeaderContent } from './styles';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../context/auth';

const Header: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <HeaderContent>
        <a href="/home">
          <img width="200px" src={logoImg} alt="SexismResearch" />
        </a>
        <div>
          {/* <a href="/news">
            Notícias
          </a> */}
          {/* <a href="/about">Sobre</a> */}
          <a href="/" onClick={signOut}>
            Logout
          </a>
        </div>
      </HeaderContent>
    </Container>
  );
};

export default Header;

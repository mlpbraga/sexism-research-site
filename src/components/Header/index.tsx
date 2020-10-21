import React from 'react';

import { Container, HeaderContent } from './styles';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../context/auth';

const Header: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <HeaderContent>
        <img width="200px" src={logoImg} alt="SexismResearch" />
        <a href="/" onClick={signOut}>
          Logout
        </a>
      </HeaderContent>
    </Container>
  );
};

export default Header;

import React from 'react';
import { FiMail } from 'react-icons/fi';
import { FaRegLightbulb } from 'react-icons/fa';

import { Container, RightBlock, TextRightIcon } from './styles';

const Footer: React.FC = () => {
  return (
    <Container>
      <TextRightIcon>
        <FaRegLightbulb />
        <small>Criado por Maria Luísa Pereira Braga </small>
      </TextRightIcon>
      <RightBlock>
        <small>Contato:</small>
        <TextRightIcon>
          <FiMail />
          <small>
            <a href="mailto:mlpb@icomp.ufam.edu.br">mlpb@icomp.ufam.edu.br</a>
          </small>
        </TextRightIcon>
      </RightBlock>
    </Container>
  );
};

export default Footer;

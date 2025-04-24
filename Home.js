import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

function Home() {
  return (
    <HomeContainer>
      <Title>Bem-vindo ao Sistema de Registro de Carga Horária</Title>
      <Card>
        <h2>Como usar o sistema</h2>
        <p>
          Este sistema permite registrar e acompanhar a carga horária dos membros da equipe.
          Para começar, você pode:
        </p>
        <ul style={{ margin: '1rem 0' }}>
          <li>Cadastrar novos membros</li>
          <li>Registrar horas trabalhadas</li>
          <li>Acompanhar o histórico de horas</li>
        </ul>
        <Button to="/members">Gerenciar Membros</Button>
      </Card>
    </HomeContainer>
  );
}

export default Home; 
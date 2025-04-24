import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  margin-bottom: 2rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: left;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ActionButton = styled(Link)`
  color: #3498db;
  margin-right: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

function MemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Aqui você implementaria a chamada à API para buscar os membros
    // Por enquanto, vamos usar dados mockados
    const mockMembers = [
      { id: 1, name: 'João Silva', role: 'Desenvolvedor' },
      { id: 2, name: 'Maria Santos', role: 'Designer' },
    ];
    setMembers(mockMembers);
  }, []);

  return (
    <Container>
      <Title>Membros da Equipe</Title>
      <Button to="/members/new">Adicionar Novo Membro</Button>
      <Table>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Cargo</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <Tr key={member.id}>
              <Td>{member.name}</Td>
              <Td>{member.role}</Td>
              <Td>
                <ActionButton to={`/hours/${member.id}`}>
                  Registrar Horas
                </ActionButton>
                <ActionButton to={`/members/${member.id}`}>
                  Editar
                </ActionButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default MemberList; 
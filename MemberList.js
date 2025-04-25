import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { db } from './firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const AddButton = styled(Link)`
  display: inline-block;
  background-color: #2ecc71;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  margin-bottom: 2rem;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #27ae60;
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
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
  background-color: #fde8e8;
  border-radius: 8px;
  margin: 1rem 0;
`;

function MemberList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        const membersRef = collection(db, 'members');
        const q = query(membersRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const membersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMembers(membersData);
      } catch (error) {
        console.error('Erro ao buscar membros:', error);
        setError('Erro ao carregar os membros. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <LoadingMessage>Carregando membros...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <Title>Membros da Equipe</Title>
      <AddButton to="/members/new">Adicionar Novo Membro</AddButton>
      <Table>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Cargo</Th>
            <Th>E-mail</Th>
            <Th>Telefone</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <Tr key={member.id}>
              <Td>{member.name}</Td>
              <Td>{member.role}</Td>
              <Td>{member.email}</Td>
              <Td>{member.phone}</Td>
              <Td>
                <ActionButton to={`/hours/${member.id}`}>
                  Registrar Horas
                </ActionButton>
                <ActionButton to={`/history/${member.id}`}>
                  Histórico
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
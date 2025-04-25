import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { db } from './firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
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

const TotalHours = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-align: right;
  font-weight: bold;
  color: #2c3e50;
`;

function HoursHistory() {
  const { memberId } = useParams();
  const [hours, setHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const fetchHours = async () => {
      try {
        setLoading(true);
        setError(null);
        const hoursRef = collection(db, 'hours');
        const q = query(
          hoursRef,
          where('memberId', '==', memberId),
          orderBy('date', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const hoursData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setHours(hoursData);
        
        // Calcula o total de horas
        const total = hoursData.reduce((sum, hour) => sum + parseFloat(hour.hours), 0);
        setTotalHours(total);
      } catch (error) {
        console.error('Erro ao buscar horas:', error);
        setError('Erro ao carregar o histórico de horas');
      } finally {
        setLoading(false);
      }
    };

    fetchHours();
  }, [memberId]);

  if (loading) {
    return <LoadingMessage>Carregando histórico de horas...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <Title>Histórico de Horas</Title>
      <Table>
        <thead>
          <tr>
            <Th>Data</Th>
            <Th>Horas</Th>
            <Th>Descrição</Th>
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <Tr key={hour.id}>
              <Td>{format(new Date(hour.date), 'dd/MM/yyyy', { locale: ptBR })}</Td>
              <Td>{hour.hours}</Td>
              <Td>{hour.description}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <TotalHours>
        Total de Horas: {totalHours.toFixed(1)}
      </TotalHours>
    </Container>
  );
}

export default HoursHistory; 
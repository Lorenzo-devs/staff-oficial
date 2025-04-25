import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
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

function HoursForm() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    hours: '',
    description: '',
  });

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        setError(null);
        const memberDoc = await getDoc(doc(db, 'members', memberId));
        
        if (memberDoc.exists()) {
          setMember({ id: memberDoc.id, ...memberDoc.data() });
        } else {
          setError('Membro não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar membro:', error);
        setError('Erro ao carregar os dados do membro');
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [memberId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hoursRef = collection(db, 'hours');
      await addDoc(hoursRef, {
        memberId,
        memberName: member.name,
        ...formData,
        createdAt: new Date(),
      });
      navigate('/members');
    } catch (error) {
      console.error('Erro ao salvar horas:', error);
      alert('Erro ao salvar as horas. Por favor, tente novamente.');
    }
  };

  if (loading) {
    return <LoadingMessage>Carregando dados do membro...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!member) {
    return <ErrorMessage>Membro não encontrado</ErrorMessage>;
  }

  return (
    <Container>
      <Title>Registrar Horas - {member.name}</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="date">Data</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="hours">Horas Trabalhadas</Label>
          <Input
            type="number"
            id="hours"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            min="0"
            step="0.5"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Descrição das Atividades</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <ButtonGroup>
          <Button type="submit">Salvar</Button>
          <Button
            type="button"
            onClick={() => navigate('/members')}
            style={{ backgroundColor: '#95a5a6' }}
          >
            Cancelar
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}

export default HoursForm; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

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

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: #fde8e8;
`;

function MemberForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Adiciona o documento à coleção 'members'
      const docRef = await addDoc(collection(db, 'members'), {
        ...formData,
        createdAt: new Date().toISOString()
      });

      console.log('Membro adicionado com ID:', docRef.id);
      navigate('/members');
    } catch (error) {
      console.error('Erro ao adicionar membro:', error);
      setError('Erro ao salvar o membro. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Adicionar Novo Membro</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="role">Cargo</Label>
          <Input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </FormGroup>
        <ButtonGroup>
          <Button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
          <Button
            type="button"
            onClick={() => navigate('/members')}
            style={{ backgroundColor: '#95a5a6' }}
            disabled={loading}
          >
            Cancelar
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}

export default MemberForm; 
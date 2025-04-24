import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { pegar, atualizar } from '../api/monstro';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  background: #333333;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
  color: #f5f5f5;
`;

const Title = styled.h2`
  text-align: center;
  color: #F5C800;
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.3rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  background-color: #555555;
  color: #fff;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  background-color: #555555;
  color: #fff;
`;

const Button = styled.button`
  margin-top: 1rem;
  background-color: #F5C800;
  color: #222;
  padding: 0.7rem;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #ff9e00;
  }
`;


export default function MonstroEdit() {
  const [form, setForm] = useState({});
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await pegar(id);
      setForm(res.data);
    })();
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    await atualizar(id, form);
    nav('/');
  };

  if (!form.id) return <div>Carregando...</div>;
  return (
    <Container>
      <Title>Editar Monstro</Title>
      <form onSubmit={handleSubmit}>
        {['nome', 'hp', 'dps', 'elemento'].map(key => (
          <FormGroup key={key}>
            <Label>{key.toUpperCase()}:</Label>
            <Input name={key} value={form[key]} onChange={handleChange} />
          </FormGroup>
        ))}
        <FormGroup>
          <Label>TAMANHO:</Label>
          <Select name="tamanho" value={form.tamanho} onChange={handleChange}>
            <option value="">Selecione...</option>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
          </Select>
        </FormGroup>
        <Button type="submit">Atualizar</Button>
      </form>
    </Container>
  );
}
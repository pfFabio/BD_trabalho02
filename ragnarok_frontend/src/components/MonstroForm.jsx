import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { criar } from "../api/monstro";
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

export default function MonstroForm(){
    const [form, setForm] = useState({ nome: '', hp: 0, dps: 0, elemento: '', tamanho: '' });
    const nav = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        let novoValor = value;
    
        if (name === 'dps') {
          novoValor = value.replace(',', '.'); // substitui vírgula por ponto
        }
        
        setForm({...form, [name]: novoValor})
    }
    const handleSubmit = async e =>{
        e.preventDefault();
        await criar({
            ...form,
            hp: parseInt(form.hp),
            dps: parseFloat(form.dps.replace(',', '.'))
        });
        nav('/');
    };


    return (
        <Container>
            <Title>Novo Monstro</Title>
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
                <Button type="submit">Salvar</Button>
            </form>
        </Container>
    )
}
import React, {useEffect, useState} from "react";
import { listar, deletar } from "../api/monstro";
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  background: #333333;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
  color: #f5f5f5;
`;

const Title = styled.h2`
  text-align: center;
  color: #F5C800; /* Gold color */
  font-family: 'Arial', sans-serif;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #444444;
  color: #F5C800;
  padding: 1rem;
  text-align: left;
`;

const ActionHeader = styled(TableHeader)`
    padding-left: 4rem;
`

const TableCell = styled.td`
  background-color: #555555;
  color: #fff;
  padding: 0.8rem;
  text-align: left;
`;

const Button = styled.button`
  background-color: #F5C800;
  color: #222;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    background-color: #ff9e00;
  }
`;


export default function MonstroList(){
    const [monstros, setMonstros] = useState([]);
    const fetch = async() => {
        try {
            const res = await listar();
            setMonstros(res.data);
        }catch (err) {
            console.error('Erro ao buscar monstros:', err);
        }
    };
    useEffect(()=> {fetch(); }, [])

    const handleDelete = async id =>{
        await deletar(id);
        fetch();
    };
    return (
        <Container>
            <Title>Lista de Monstros</Title>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>Nome</TableHeader>
                        <TableHeader>HP</TableHeader>
                        <TableHeader>DPS</TableHeader>
                        <TableHeader>Elemento</TableHeader>
                        <TableHeader>Tamanho</TableHeader>
                        <ActionHeader>Ações</ActionHeader>
                    </tr>
                </thead>
                <tbody>
                {monstros.map(m => (
                    <tr key={m.id}>
                        <TableCell>{m.nome}</TableCell>
                        <TableCell>{m.hp}</TableCell>
                        <TableCell>{m.dps}</TableCell>
                        <TableCell>{m.elemento}</TableCell>
                        <TableCell>{m.tamanho}</TableCell>
                        <TableCell>
                            <Link to={`/editar/${m.id}`}>
                                <Button>Editar</Button>
                            </Link>
                            <Button onClick={() => handleDelete(m.id)}>Excluir</Button>
                        </TableCell>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}

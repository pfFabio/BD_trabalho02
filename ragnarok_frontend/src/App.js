import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import MonstroList from './components/MonstroList';
import MonstroForm from './components/MonstroForm';
import MonstroEdit from './components/MonstroEdit';
import styled from "styled-components";

const Container = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  background: #444444;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  color: #f5f5f5;
`;

const Title = styled.h1`
  text-align: center;
  color: #F5C800; 
  font-family: 'Arial', sans-serif;
`;

const Nav = styled.nav`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const NavLink = styled(Link)`
  color: #F5C800;
  text-decoration: none;
  font-weight: bold;
  margin: 0 1rem;
  
  &:hover {
    color: #ff9e00;
  }
`;



function App() {
  return (
    <Router>
      <Container>
        <Title>Monstros Ragnarok</Title>
        <Nav>
          <NavLink to="/">Listar</NavLink> | <NavLink to="/novo">Novo</NavLink>
        </Nav>
        <Routes>
          <Route path="/" element={<MonstroList />} />
          <Route path="/novo" element={<MonstroForm />} />
          <Route path="/editar/:id" element={<MonstroEdit />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

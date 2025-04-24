import axios from 'axios';

const API = axios.create({baseURL:  'http://localhost:8000/monstros'});

export const listar = () => API.get('/');
export const pegar = id => API.get(`/${id}`);
export const criar = data => API.post('/', data);
export const atualizar = (id, data) => API.put(`/${id}`, data);
export const deletar = id => API.delete(`/${id}`);



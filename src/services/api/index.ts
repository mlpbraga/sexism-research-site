// API service
import axios from 'axios';

const baseURL = 'https://api.sexismo.app';

//const baseURL = 'http://localhost:4444/';

const token = localStorage.getItem('@SexismResearch:token');
const api = axios.create({
  baseURL,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

export default api;

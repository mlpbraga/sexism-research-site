// API service
import axios from 'axios';

const baseURL = 'https://ec2-54-84-35-171.compute-1.amazonaws.com:4444';

//const baseURL = 'http://localhost:4444/';

const token = localStorage.getItem('@SexismResearch:token');
const api = axios.create({
  baseURL,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

export default api;

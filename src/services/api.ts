import axios from 'axios';

const baseURL = 'http://sexism-app-351908187.us-east-1.elb.amazonaws.com/';
const token = localStorage.getItem('@SexismResearch:token');
const api = axios.create({
  baseURL,
  headers: token ? { Authorization: `Bearer ${token}`} : {},
});

export default api;

import axios from 'axios';

export const API_URL = process.env.API_URL || (
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000'
);

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
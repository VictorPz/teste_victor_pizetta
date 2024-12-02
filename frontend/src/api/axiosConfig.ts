import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Atualize para a URL do seu backend
});

export default api;

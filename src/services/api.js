import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: 'https://inventario.web7online.com',
});

api.interceptors.request.use(
  async (options) => {
    const token = await config.getToken();
    if (token) options.headers.Authorization = `Bearer ${token}`;
    options.headers['Content-Type'] = 'application/json;charset=UTF-8';
    return options;
  },
  (error) => {
    console.log('Request error: ', error);
    return Promise.reject(error);
  },
);

export default api;

import axios from "axios";
import { envConfig } from "../config/env";


const api = axios.create({
  baseURL: envConfig.apiUrl,
});

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.status === 498) {
            sessionStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default api;
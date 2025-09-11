import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

export const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.status === 498 && !window.location.pathname.startsWith('/auth')) {
          sessionStorage.removeItem('token');
          navigate('/auth/login');
        }
        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [navigate]);
};
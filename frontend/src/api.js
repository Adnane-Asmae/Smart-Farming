import axios from 'axios';
import useAuthStore from './stores/useAuthStore';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, logout: storeLogout, setTokens } = useAuthStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (refreshToken) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/auth/refresh/', {
            refresh: refreshToken,
          });

          setTokens(response.data.access, response.data.refresh);
          api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

          return api(originalRequest);
        } catch (refreshError) {
          storeLogout();
          window.location.href = '/login';
        }
      } else {
        storeLogout();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// Auth functions based on your backend
export const login = async (email, password) => {
  const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
    email,
    password,
  });
  
  const { setTokens, setUser } = useAuthStore.getState();
  setTokens(response.data.access, response.data.refresh);
  
  if (response.data.user) {
    setUser(response.data.user);
  }
  
  api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
  return response.data;
};

export const logout = async () => {
  const { refreshToken, logout: storeLogout } = useAuthStore.getState();
  
  if (refreshToken) {
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/logout/', {
        refresh: refreshToken,
      });
    } catch (e) {
      console.error('Logout error:', e);
    }
  }
  
  storeLogout();
  delete api.defaults.headers.common['Authorization'];
};

export const getCurrentUser = async () => {
  const response = await api.get('/users/me/');
  const { setUser } = useAuthStore.getState();
  setUser(response.data);
  return response;
};

export const changePassword = async (oldPassword, newPassword) => {
  return await api.post('/users/change-password/', {
    old_password: oldPassword,
    new_password: newPassword,
  });
};

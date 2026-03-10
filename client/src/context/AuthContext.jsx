import React, { useEffect, useState } from 'react';
import AuthContext from './authContext';
import { authService } from '../services/authService';

const clearStoredAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const persistAuth = (data) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        try {
          const response = await authService.verify(storedToken);

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setToken(storedToken);
          } else {
            const adminResponse = await authService.verifyAdmin(storedToken);
            if (adminResponse.ok) {
              const adminData = await adminResponse.json();
              setUser(adminData);
              setToken(storedToken);
            } else {
              clearStoredAuth();
              setUser(null);
              setToken(null);
            }
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          if (error.name !== 'TypeError') {
            clearStoredAuth();
            setUser(null);
            setToken(null);
          }
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const adminResponse = await authService.adminLogin({ email, password });
    const adminData = await adminResponse.json();

    if (adminResponse.ok) {
      persistAuth(adminData);
      setToken(adminData.token);
      setUser(adminData.user);
      return adminData;
    }

    const userResponse = await authService.login({ email, password });
    const userData = await userResponse.json();

    if (!userResponse.ok) {
      throw new Error(userData.error || userData.message || 'Login failed');
    }

    persistAuth(userData);
    setToken(userData.token);
    setUser(userData.user);
    return userData;
  };

  const signup = async ({ name, email, phone, password }) => {
    const response = await authService.register({ name, email, phone, password });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Failed to create account');
    }

    persistAuth(data);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    clearStoredAuth();
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';
import axios from 'axios';


const AuthContext = createContext({
    http: null,
    token: null,
    userData: null,
    isAuthLoading: true,
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
    baseURL: '',
});
export { AuthContext };


export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    const http = useMemo(() => {
        const instance = axios.create({
            baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api',
            withCredentials: true,
        });

        instance.interceptors.response.use(
            response => response,
            error => {
                if (!error.response && error.message === "Network Error") {
                    localStorage.clear();
                    navigate("/503");
                } else if (error.response?.status === 401) {
                    localStorage.clear();
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
        return instance;
    }, [navigate]);

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setIsAuthLoading(false);
                return;
            }

            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                    alert('Session expired. Please login again.');
                } else {
                    setUserData(decoded);
                    http.defaults.headers.common.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Invalid token:', error);
                logout();
            } finally {
                setIsAuthLoading(false);
            }
        };

        validateToken();
    }, [token, http]);

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setUserData(null);
        delete http.defaults.headers.common.Authorization;
        navigate('/login');
    };

    const value = useMemo(() => ({
        http,
        token,
        userData,
        isAuthLoading,
        isAuthenticated: !!token,
        login,
        logout,
        baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
    }), [token, userData, http, isAuthLoading]);

    return (
        <AuthContext.Provider value={value}>
            {!isAuthLoading ?
                children :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    Validating Session...
                </div>
            }
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

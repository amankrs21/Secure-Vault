import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// Axios instance with default configurations
const http = axios.create({
    baseURL: "http://192.168.1.38:3000/api/",
    headers: {
        "Content-Type": "application/json",
    },
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
    withCredentials: true,
});

// Axios response interceptor to handle errors
http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response && error.message === "Network Error") {
            <Navigate to="/503" />;
        } else if (error.response.status === 403 || error.response.status === 401) {
            localStorage.clear();
            <Navigate to="/" />;
        }
        return Promise.reject(error);
    }
);

export default function AuthUser() {
    const [token, setToken] = useState(null);
    useEffect(() => {
        const authData = localStorage.getItem("authData");
        if (authData) {
            const parsedData = JSON.parse(authData);
            if (isValidToken(parsedData.token)) {
                setToken(parsedData.token);
                http.defaults.headers.common.Authorization = `Bearer ${parsedData.token}`;
            } else {
                localStorage.clear();
            }
        }
    }, []);

    // Save the token and user data in localStorage and set headers
    const saveToken = (token, user) => {
        if (isValidToken(token)) {
            setToken(token);
            const authData = { token, user };
            localStorage.setItem("authData", JSON.stringify(authData));
            http.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
    };

    // Validate if the token is not expired
    const isValidToken = (token) => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    toast.warning("Session expired. Please log in again.");
                    <Navigate to="/" />;
                    localStorage.clear();
                    return false;
                }
                return true;
            } catch (error) {
                console.error("Error decoding token:", error);
                return false;
            }
        }
        return false;
    };

    // Check if the logged-in user is an admin
    const isAdmin = () => {
        const authData = localStorage.getItem("authData");
        if (authData) {
            const { token, user } = JSON.parse(authData);
            return isValidToken(token) && user.role === "admin";
        }
        return false;
    };

    return {
        setToken: saveToken,
        isValidToken,
        isAdmin,
        token,
        http,
    };
}

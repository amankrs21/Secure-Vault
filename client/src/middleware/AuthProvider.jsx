import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


// Use environment variables for base URL
const baseURL = window.location.origin.includes("localhost") || window.location.origin.includes("192.168")
    ? "http://192.168.1.33:3000/api/"
    : "https://security-vault.onrender.com/api/";


// Axios instance with default configurations
const http = axios.create({
    baseURL,
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
            localStorage.clear();
            window.location.href = "/503";
        }
        if (error.response.status === 401 && error.response.data.message === "Unauthorized") {
            localStorage.clear();
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export default function useAuth() {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && isValidToken(token)) {
            setToken(token);
            http.defaults.headers.common.Authorization = `Bearer ${token}`;
        } else { localStorage.clear(); }
    }, []);

    // Save the token in localStorage and set headers
    const saveToken = (token) => {
        if (isValidToken(token)) {
            setToken(token);
            localStorage.setItem("token", token);
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
                    alert("Session expired. Please log in again.");
                    localStorage.clear();
                    navigate("/");
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

    return {
        setToken: saveToken,
        isValidToken,
        token,
        http,
    };
}

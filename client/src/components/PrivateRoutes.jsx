import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import AuthUser from './auth/AuthUser';
import Header from '../pages/header/Header';


export default function PrivateRoutes() {
    const navigate = useNavigate();
    const { isValidToken } = AuthUser();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || !isValidToken(token)) {
            navigate('/login');
        }
    }, [navigate, isValidToken]);

    return (
        <>
            <Header />
            <div style={{ marginTop: '9vh', height: '91vh', overflowY: 'auto' }}><Outlet /></div>
        </>
    );
};

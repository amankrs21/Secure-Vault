import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import AuthUser from './AuthUser';
import Header from '../pages/header/Header';

export default function PrivateRoutes() {
    const navigate = useNavigate();
    const { isValidToken } = AuthUser();

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem("authData"));
        if (!authData || !isValidToken(authData.token)) {
            navigate('/login');
            return;
        }
    }, [navigate, isValidToken]);

    return (
        <>
            <Header />
            <div style={{ marginTop: '9vh', height: '91vh', overflowY: 'auto' }}><Outlet /></div>
        </>
    );
};

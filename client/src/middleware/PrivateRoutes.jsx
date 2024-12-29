import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import AuthUser from './AuthProvider';
import Header from '../pages/header/Header';
import KeySetupModal from '../components/key/KeySetupModal';
import KeyAccessModal from '../components/key/KeyAccessModal';
import { useLoading } from '../components/loading/useLoading';


export default function PrivateRoutes() {
    const navigate = useNavigate();
    const { isValidToken } = AuthUser();
    const { setLoading } = useLoading();
    const [openSetup, setOpenSetup] = useState(false);
    const [openAccess, setOpenAccess] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            const eKey = localStorage.getItem("eKey");
            const token = localStorage.getItem("token");
            const isKeySet = localStorage.getItem("isKeySet");
            if (!token || !(await isValidToken(token))) {
                localStorage.clear();
                navigate('/login');
            } else {
                setIsAuthenticated(true);
                if (!eKey) {
                    if (isKeySet === 'false') setOpenSetup(true);
                    else setOpenAccess(true);
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, [navigate, setLoading]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <Header />
            <div style={{ marginTop: '9vh', height: '91vh', overflowY: 'auto' }}>
                {openSetup && <KeySetupModal openSetup={openSetup} setOpenSetup={setOpenSetup} />}
                {openAccess && <KeyAccessModal openAccess={openAccess} setOpenAccess={setOpenAccess} />}
                <Outlet />
            </div>
        </>
    );
};

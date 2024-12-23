import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import AuthUser from './AuthProvider';
import Header from '../pages/header/Header';
import KeySetupModal from '../components/key/KeySetupModal';
import KeyAccessModal from '../components/key/KeyAccessModal';


export default function PrivateRoutes() {
    const navigate = useNavigate();
    const { isValidToken } = AuthUser();
    const [openSetup, setOpenSetup] = useState(false);
    const [openAccess, setOpenAccess] = useState(false);

    useEffect(() => {
        const ekey = localStorage.getItem("ekey");
        const token = localStorage.getItem("token");
        const svInfo = JSON.parse(localStorage.getItem("_svInfo")) ?? {};
        if (!token || !isValidToken(token)) {
            navigate('/login');
        }
        if (!ekey) {
            if (svInfo.isFirstLogin) setOpenSetup(true);
            else setOpenAccess(true);
        }
    }, [navigate, isValidToken]);

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

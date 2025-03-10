import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuth } from '../hooks/useAuth';

import Header from '../layout/Header';
import KeySetupModal from '../components/key/KeySetupModal';
import KeyAccessModal from '../components/key/KeyAccessModal';


// PrivateRoutes component to protect routes
export default function PrivateRoutes() {

    const { isAuthLoading, isAuthenticated, http, logout } = useAuth();

    const [openSetup, setOpenSetup] = useState(false);
    const [openAccess, setOpenAccess] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) logout();
        if (isAuthLoading || !http.defaults.headers.common.Authorization) return;
    }, [isAuthLoading, isAuthenticated, http, logout]);

    useEffect(() => {
        const checkAuth = async () => {
            const eKey = localStorage.getItem("eKey");
            const isKeySet = localStorage.getItem("isKeySet");
            if (!eKey) {
                if (isKeySet === 'false') setOpenSetup(true);
                else setOpenAccess(true);
            }
        };
        checkAuth();
    }, []);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            {!isAuthLoading && isAuthenticated && http.defaults.headers.common.Authorization ? (
                <>
                    <Header />
                    <div style={{ marginTop: '8vh', height: '92vh', overflowY: 'auto', paddingTop: '5px' }}>
                        {openSetup && <KeySetupModal openSetup={openSetup} setOpenSetup={setOpenSetup} />}
                        {openAccess && <KeyAccessModal openAccess={openAccess} setOpenAccess={setOpenAccess} />}
                        <Outlet />
                    </div>
                </>
            ) :
                null
            }
        </>
    );
};

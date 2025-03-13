import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import Home from "./pages/home/Home";
import Vault from "./pages/vault/Vault";
import Login from "./pages/login/Login";
import Account from "./pages/account/Account";
import Journal from "./pages/journal/Journal";
import Register from "./pages/register/Register";
import ServerUnavl from './pages/503/ServerUnavl';
import PageNotFound from './pages/404/PageNotFound';
import PrivateRoutes from "./middleware/PrivateRoutes";
import Collaborate from "./pages/collaborate/Collaborate";


// Router component to render the application routes
export default function Router() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/503" element={<ServerUnavl />} />
                    <Route path="/404" element={<PageNotFound />} />

                    <Route path='*' element={<Navigate to='/404' />} />
                    <Route path="/" element={<Navigate to="/login" />} />

                    <Route path="/" element={<PrivateRoutes />}>
                        <Route path='/home' element={<Home />} />
                        <Route path='/vault' element={<Vault />} />
                        <Route path='/journal' element={<Journal />} />
                        <Route path='/account' element={<Account />} />
                        <Route path='/collaborate' element={<Collaborate />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

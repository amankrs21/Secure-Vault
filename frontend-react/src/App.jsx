import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./pages/login/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import PageNotFound from "./components/PageNotFound";
import ServerUnavl from "./components/ServerUnavl";
import Home from "./pages/home/Home";
import Vault from "./pages/vault/Vault";
import Notes from "./pages/notes/Notes";
import Connect from "./pages/connect/Connect";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" draggable={false} hideProgressBar={true} position="bottom-right" />
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='*' element={<Navigate to='/404' />} />
        <Route path='/login' element={<Login />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="/503" element={<ServerUnavl />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path='/home' element={<Home />} />
          <Route path='/vault' element={<Vault />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/connect' element={<Connect />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

import {
  BrowserRouter, Routes, Route, Navigate
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Vault from "./pages/vault/Vault";
import Notes from "./pages/notes/Notes";
import Connect from "./pages/connect/Connect";
import Register from "./pages/register/Register";
import Loading from "./components/loading/Loading";
import ServerUnavl from "./pages/error/ServerUnavl";
import PageNotFound from "./pages/error/PageNotFound";
import PrivateRoutes from "./components/auth/PrivateRoutes";
import { LoadingProvider } from "./components/loading/LoadingContext";


export default function App() {
  return (
    <LoadingProvider>
      <Loading />
      <ToastContainer theme="colored" draggable={false} hideProgressBar={true} position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='*' element={<Navigate to='/404' />} />
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />} />
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
    </LoadingProvider>
  )
}

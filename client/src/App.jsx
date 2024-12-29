import {
  BrowserRouter, Routes, Route, Navigate
} from "react-router-dom";

import Home from "./pages/home/Home";
import Vault from "./pages/vault/Vault";
import Login from "./pages/login/Login";
import Account from "./pages/account/Account";
import Journal from "./pages/journal/Journal";
import Register from "./pages/register/Register";
import ServerUnavl from "./pages/error/ServerUnavl";
import PageNotFound from "./pages/error/PageNotFound";
import PrivateRoutes from "./middleware/PrivateRoutes";
import Collaborate from "./pages/collaborate/Collaborate";


export default function App() {
  return (
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
          <Route path='/journal' element={<Journal />} />
          <Route path='/account' element={<Account />} />
          <Route path='/collaborate' element={<Collaborate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

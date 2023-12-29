import HomePage from '@pages/HomePage/HomePage';
import HrefPage from '@pages/HrefPage/HrefPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import Cookies from 'js-cookie';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BlagoUsersPage from './pages/BlagoUsersPage/BlagoUsersPage';
import VoulonteeUsersPage from './pages/VoulonteeUsersPage/VoulonteeUsersPage';
import PartnersUsersPage from './pages/PartnersUsersPage/PartnersUsersPage';
import { useEffect } from 'react';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      // Если токена нет, перенаправляем пользователя на страницу входа
      navigate('/login');
    }
  }, [navigate]);
  return (
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<HrefPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='users/users' element={<BlagoUsersPage />} />
        <Route path='users/voulontee' element={<VoulonteeUsersPage />} />
        <Route path='users/partners' element={<PartnersUsersPage />} />
      </Routes>
  )
}

export default App

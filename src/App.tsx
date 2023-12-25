import HomePage from '@pages/HomePage/HomePage';
import HrefPage from '@pages/HrefPage/HrefPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlagoUsersPage from './pages/BlagoUsersPage/BlagoUsersPage';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<HrefPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='users/users' element={<BlagoUsersPage />} />
      </Routes>
    </Router>
  )
}

export default App

import { Navigate, useNavigate, Routes, Route, Link } from 'react-router-dom';
import Manager from './Components/Manager'
import User from './Components/User'
import LoginScreen from './Components/LoginScreen'
import Item from './Components/Item'

import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/user/:manager' element={<Manager />} />
        <Route path='/item/:singleitem' element={<Item />} />
        <Route path='/' element={<User />} />
      </Routes>
    </>
  );
}

export default App;
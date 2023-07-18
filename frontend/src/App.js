import { Navigate, useNavigate, Routes, Route } from 'react-router-dom';
import Manager from './Components/Manager'
import User from './Components/User'
import Home from './Components/Home'

import './App.css';

function App() {
  const navigate = useNavigate();
  
  return (
    <>
      <div className='headerbar' id='headerbar'>
        <h1 className='header' id='header' onClick={() => navigate('/')}> Test Header </h1>
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:manager' element={<Manager />} />
        <Route path='/browse' element={<User />} />
      </Routes>
    </>
  );
}

export default App;
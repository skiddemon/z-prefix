import { Navigate, useNavigate, Routes, Route, Link } from 'react-router-dom';


function Header() {
    const navigate = useNavigate();

    return (
        <div className='headerbar' id='headerbar' >
            <h1 className='header' id='header' onClick={() => navigate('/')}>Home</h1>
            <button className='loginButton' id='loginButton' onClick={() => navigate('/login')}>Login</button>
        </div>
    )
}

export default Header;
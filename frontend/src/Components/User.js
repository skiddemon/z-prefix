import { Navigate, useNavigate, Routes, Route, Link } from 'react-router-dom';

function User() {
    const navigate = useNavigate();

    return (
        <>
            <div className='headerbar' id='headerbar'>
                <h1 className='header' id='header' onClick={() => navigate('/')}> Test Header </h1>
                <button className='loginButton' id='loginButton' onClick={() => navigate('/login')}>Login</button>
            </div>
            <div>
                <h1>Browsing goes here</h1>
            </div>
        </>
    )
}

export default User
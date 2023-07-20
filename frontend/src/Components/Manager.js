import { Navigate, useNavigate, Routes, Route, Link } from 'react-router-dom';

function Manager() {


    const navigate = useNavigate();

    const dataGetter = () => {
        fetch('http://localhost:8080/manager')
            .then(response => response.json())
            .then(data => data)
    }


    return (
        <>
            <div className='headerbar' id='headerbar'>
                <h1 className='header' id='header' onClick={() => navigate('/')}> Test Header </h1>
                <button className='loginButton' id='loginButton' onClick={() => navigate('/login')}>Login</button>
            </div>
            <div>
                <h1>Manager testing</h1>
            </div>
        </>
    )
}

export default Manager
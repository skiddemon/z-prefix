import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';

function LoginScreen() {
    const [logon, setLogon] = useState('user')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [backendData, setBackendData] = useState([{}])
    
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/login')
            .then(response => response.json())
            .then(data => setBackendData(data))
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-type","application/json");
        myHeaders.append("Accept","application/json");
        const data = { username: username, password: password };
        console.log(data);
        await fetch('http://localhost:8080/login', {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data)
        }).then(() => { navigate(`/${username}`) })
    }

    return (
        <>
            <div className='headerbar' id='headerbar'>
                <h1 className='header' id='header' onClick={() => navigate('/')}> Test Header </h1>
                <button className='loginButton' id='loginButton' onClick={() => navigate('/login')}>Login</button>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <input type='text' id="usernameInput" placeholder='Username' onChange={(event) => setUsername(event.target.value)}></input>

                    <input type='password' id='passwordInput' placeholder='Password' onChange={(event) => setPassword(event.target.value)}></input>

                    <button type='submit'>Login</button>
                </form >
            </div>

            <div>
                {(typeof backendData[0].username === undefined)
                    ?
                    (console.log(backendData[0].username)
                    ,<p>Loading...</p>)
                    :
                    (
                        backendData.map(
                            (user, i) => (<p key={i} >{user.hash}</p>)
                        )
                    )}
            </div>
        </>
    )
}

export default LoginScreen
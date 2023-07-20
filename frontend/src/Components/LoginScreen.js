import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header';
import React from 'react';

function LoginScreen() {
    const [logon, setLogon] = useState('user');

    //below sets states for fetching users from database
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    //checks if username exists
    const [existingUsername, setExistingUsername] = useState([]);

    //should probably delete this from login, change to /items, and put in browse
    const [backendData, setBackendData] = useState([{}]);

    //used to conditinally render create new account popup
    const [noUserAlert, setNoUserAlert] = useState(false);

    const navigate = useNavigate();

    //should probably delete this from login, change to /items, and put in browse
    useEffect(() => {
        fetch('http://localhost:8080/login')
            .then(response => response.json())
            .then(data => setBackendData(data))
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { username: username, password: password };
        await fetch(`http://localhost:8080/user/${username}`)
            .then(response => response.json())
            .then(data => console.log(data))

        if (existingUsername === username) {
            const myHeaders = new Headers();
            myHeaders.append("Content-type", "application/json");
            myHeaders.append("Accept", "application/json");
            await fetch('http://localhost:8080/login', {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(data)
            }).then(() => { navigate(`/user/${username}`) })
        } else {
            setNoUserAlert(true)
        }
    }

    const handleCreateAccount = async (event) => {
        event.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-type", "application/json");
        myHeaders.append("Accept", "application/json");
        const data = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password
        };
        console.log(data)
        await fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data)
        })
            .then(() => { navigate(`/user/${username}`) })
    }

    return (
        <>
            <Header />

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
                        , <p>Loading...</p>)
                    :
                    (
                        backendData.map(
                            (user, i) => (<p key={i} >{user.username}</p>)
                        )
                    )}
            </div>
            {noUserAlert ?
                <div className='create-user-popup'>
                    <div className='create-user-popup-header'>
                        <h2>User does not exist.</h2>
                        <p>Would you like to create an account?</p>
                        <form onSubmit={handleCreateAccount}>
                            <input type='text' id="firstnameInput" placeholder='First Name' onChange={(event) => setFirstname(event.target.value)}></input>
                            <input type='text' id="lastnameInput" placeholder='Last Name' onChange={(event) => setLastname(event.target.value)}></input>
                            <input type='text' id="usernameInput" placeholder='Username' onChange={(event) => setUsername(event.target.value)}></input>
                            <input type='password' id='passwordInput' placeholder='Password' onChange={(event) => setPassword(event.target.value)}></input>
                            <button type='submit'>Create Account!</button>
                        </form >
                    </div>
                </div>
                : ""}
        </>
    )
}

export default LoginScreen
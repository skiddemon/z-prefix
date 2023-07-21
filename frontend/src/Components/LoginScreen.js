import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header';
import React from 'react';

function LoginScreen() {
    const navigate = useNavigate();

    //below sets states for fetching users from database
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    //checks if username exists
    const [existingUsername, setExistingUsername] = useState([]);

    //should probably delete this from login, change to /items, and put in browse
    //const [backendData, setBackendData] = useState([{}]);

    //used to conditinally render create new account popup
    const [noUserAlert, setNoUserAlert] = useState(false);

    //doesn't allow empty username or password
    const [loginAlert, setLoginAlert] = useState(false)

    //trying to use for loading issue
    const [isLoading, setIsLoading] = useState(true)

    const [isBadPass, setIsBadPass] = useState(false)

    //should probably delete this from login, change to /items, and put in browse
    // useEffect(() => {
    //     fetch('http://localhost:8080/login')
    //         .then(response => response.json())
    //         .then(data => setBackendData(data))
    // }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (username === '' || password === '') {
            setLoginAlert(true)
        } else {
            const myHeaders = new Headers();
            myHeaders.append("Content-type", "application/json");
            myHeaders.append("Accept", "application/json");
            myHeaders.append("withCredentials", true)
            const creds = {
                username: username,
                password: password
            }

            await fetch(`http://localhost:8080/login`, {
                method: "POST",
                headers: myHeaders,
                credentials: 'include',
                body: JSON.stringify(creds)
            })
                .then(response => {
                    console.log(response)
                    if (response.status !== 201) {
                        setIsBadPass(true)
                        throw new Error('Password does not match')
                    } else {
                        return response.json()
                    }
                })
                .then(data => {
                    if (data.length > 0) {
                        console.log('checking for cookies')
                        // window.localStorage.setItem("loggedIn", true)
                        navigate(`/user/${data[0].username}`)
                    } else {
                        setNoUserAlert(true)
                    }
                })
                .catch(error => console.error(error))
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

            {loginAlert == false ? '' : <p>Please fill out all fields before submitting</p>}

            {isBadPass == false ? '' : <p>Password is incorrect.  Please try again.</p>}

            {noUserAlert
                ?
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
                :
                ""
            }
        </>
    )
}

export default LoginScreen
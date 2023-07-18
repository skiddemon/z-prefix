import { Link } from 'react-router-dom'

function Home() {


    return (
        <>
            <div>
                <input type='text' ></input>
                <input type='password'></input>
                <Link to={`/business`}>
                    <h3>Login</h3>
                </Link>
            </div>
            <div>
                <Link to={`/user`}>
                    <h3>Link to user page</h3>
                </Link>
            </div>
        </>
    )
}

export default Home
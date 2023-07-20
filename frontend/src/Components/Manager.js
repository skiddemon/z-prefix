import Header from "./Header";
import { useEffect } from 'react'

function Manager() {

    useEffect(() => {
        fetch('http://localhost:8080/user/:manager')
            .then(response => response.json())
            .then(data => data)
        }, [])
    


    return (
        <>
            <Header />
            <div>
                <h1>Manager testing</h1>
            </div>
        </>
    )
}

export default Manager
import Header from './Header';
import { useEffect, useState } from 'react'

function User() {
    useEffect(() => {
        fetch('http://localhost:8080/items')
            .then(response => response.json())
            .then(data => {
                setItems(data);
                setLoading(true)
            })
    }, [])

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    return (
        <>
            <Header />
            <div>
                {(loading != true)
                    ?
                    (<p>Loading...</p>)
                    :
                    (items.map(
                        (item, i) => (
                            <div key={`div ${i}`}>
                                <p key={`name ${i}`} >{`Item name: ${item.itemname}`}</p>
                                <p key={`desc ${i}`} >{`Description: ${item.description}`}</p>
                                <p key={`quan ${i}`} >{`Quantity ${item.quantity}`}</p>
                            </div>)
                    ))
                }
            </div>
        </>
    )
}

export default User
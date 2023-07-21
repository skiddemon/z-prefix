import Header from './Header';
import { useEffect, useState } from 'react'

function Item() {
    useEffect(() => {
        fetch('http://localhost:8080/items/:manager')
            .then(response => response.json())
            .then(data => {
                setItems(data);
                setLoading(false)
            })
    }, [])

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    return (
        <>
            <Header />
            <div>
                {(loading == true)
                    ?
                    (<p>Loading...</p>)
                    :
                    (items.map(
                        (item, i) => (
                            <div key={`div ${i}`}>
                                <p key={`name ${i}`} >
                                    {`Item name: ${item.itemname}`}
                                </p>
                                <p key={`desc ${i}`} >
                                    {(item.description.length > 100)
                                        ?
                                        `Description: ${item.description.slice(0, 100)}...`
                                        :
                                        `Description: ${item.description}`}
                                </p>
                                <p key={`quan ${i}`} >
                                    {`Quantity ${item.quantity}`}
                                </p>
                            </div>)
                    ))
                }
            </div>
        </>
    )
}

export default Item
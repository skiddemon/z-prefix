import { Link, useNavigate } from 'react-router-dom';
import Header from "./Header";
import { useEffect, useState } from 'react';

function Manager() {
    useEffect(() => {
        fetch(`http://localhost:8080/items/${authToken[1]}`)
        .then(response => response.json())
        .then(data => {
            setItems(data);
            setLoading(false)
        })
        .then()
    }, [])
    
    const navigate = useNavigate()
    const [items, setItems] = useState()
    const [loading, setLoading] = useState(true)
    const [createItemPopup, setCreateItemPopup] = useState(false)
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(0)
    const tokens = document.cookie.split('; ')
    const useridToken = tokens[1].split('=')
    const authToken = tokens[0].split('=')

    console.log(authToken, useridToken)

    function handleCreatePopup() {
        setCreateItemPopup(true)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-type", "application/json");
        myHeaders.append("Accept", "application/json");
        const data = {
            /////////////////////////////////////////
            userid: useridToken[1],
            itemname: itemName,
            description: description,
            quantity: quantity
        };
        await fetch("http://localhost:8080/items", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data)
        })
            .then(() => { navigate(`/items/${authToken[1]}`) })
    }

    return (
        <>
            <Header />

            {(createItemPopup==false)
            ?
            <div>
                <button onClick={handleCreatePopup}>Create New Item</button>
            </div>
            :
            ''
            }

            {(createItemPopup == true)
                ?
                (<div>
                    <h2>Create new item</h2>
                    <form onSubmit={handleSubmit}>
                        <input type='text' id="itemNameInput" placeholder='Item Name' onChange={(event) => setItemName(event.target.value)}></input>

                        <input type='text' id='descriptionInput' placeholder='Description' onChange={(event) => setDescription(event.target.value)}></input>

                        <input type='number' id='quantityInput' placeholder='Quantity' onChange={(event) => setQuantity(event.target.value)}></input>

                        <button type='submit'>Enter</button>
                    </form>
                </div>)

                :
                ''}

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

export default Manager
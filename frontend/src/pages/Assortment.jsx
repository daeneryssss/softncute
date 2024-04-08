import React, { useState, useEffect} from 'react';
import Axios from 'axios';

const Assortment = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await Axios.get('http://localhost:3000/assortment');
            if (response.status === 200)
            {
                const data = response.data;
                setItems(data);
            }
            else {
                console.error('Failed to fetch items. Status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching items: ', error);
        };
    };

    return (
        <div className='Main'>
            <ul>
                {items.map(item => (
                    <li key={item._id} className="ItemSection">
                        <p className="ItemName">{item.name}</p>
                        <p className="Price">Ціна: {item.price}₴</p>
                        <p className="AmountAvailable">У наявності: {item.amountAvailable} шт.</p>
                        <p className="ItemDescription">Опис: {item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Assortment;
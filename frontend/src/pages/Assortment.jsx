import React, { useState, useEffect} from 'react';
import Axios from 'axios';

const Assortment = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});

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
                const initialQuantities = data.reduce((acc, item) => {
                    acc[item._id] = 1;
                    return acc;
                }, {});
                setQuantities(initialQuantities);
            }
            else {
                console.error('Failed to fetch items. Status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching items: ', error);
        };
    };

    const handleQuantityChange = (itemId, quantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: quantity
        }));
    };

    const addToCart = async (itemId) => {
        const amount = quantities[itemId];
        const item = { _id: itemId};
        const sum = amount * items.find(item => item._id === itemId).price;
        const newItem = { item, amount, sum};
        setCart([...cart, newItem]);
        try {
            const response = await Axios.post('http://localhost:3000/cart/addItem', newItem);
            if (response.status === 201) {
                console.log('Order item added to MongoDB successfully:', response.data.newItem);
            } else {
                console.error('Failed to add order item to MongoDB. Status:', response.status);
            }
        } catch (error) {
            console.error('Error adding item to MongoDB:', error);
        }
    };

    return (
        <div className='Main'>
            <ul className='ItemsMain'>
                {items.map(item => (
                    <li key={item._id} className="ItemSection">
                        <p className="ItemName">{item.name}</p>
                        <img src={item.image} alt="Item" className="ItemImage"/>
                        <p className="Price">Ціна: {item.price}₴</p>
                        <p className="AmountAvailable">У наявності: {item.amountAvailable} шт.</p>
                        <p className="ItemDescription">Опис: {item.description}</p>
                        <section className="SelectAmount">
                            <input
                            type="number"
                            name="ItemAmountSelected"
                            className="InputItemAmount"
                            max={item.amountAvailable}
                            min={0}
                            value={quantities[item._id] || 0}
                            onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}/>
                            <button className="Button ButtonAddToCart" onClick = { () => addToCart(item._id)} >У корзину</button>
                        </section>
                    </li>
                ))}
                
            </ul>
        </div>
    )
};

export default Assortment;
import React, { useState, useEffect} from 'react';
import Axios from 'axios';

const Cart = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [items, setItems] = useState([]);
    let finalSum = 0;

    useEffect(() => {
        fetchItems();
        fetchOrderItems();
    }, []);

    const fetchOrderItems = async () => {
        try {
            const response = await Axios.get('http://localhost:3000/cart/items');
            if (response.status === 200)
            {
                const data = response.data;
                setOrderItems(data);
            }
            else {
                console.error('Failed to fetch items. Status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching items: ', error);
        };
    };

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

    const deleteItemFromCart = async(orderItemId) => {
        try {
            const response = await Axios.delete(`http://localhost:3000/cart/deleteItem/${orderItemId}`);
            if (response.status === 200) {
                console.log('Order item deleted successfully');
                window.location.reload();
            } else {
                console.error('Failed to add order item to MongoDB. Status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting order item from cart:', error);
        };
    };

    return (
        <div className="Main CartMain">
            <p className="orderHeader">Ваше замовлення</p>
            {orderItems.map(orderItem => {
                const selectedItem = items.find(item => item._id === orderItem.item);
                finalSum += orderItem.sum;
                return (
                <section className="orderInCart">
                    <img src={selectedItem ? selectedItem.image : ''} alt="Item" className="orderItemImage" />
                    <div className="orderDetails">
                        <p className="orderItemName">{selectedItem ? selectedItem.name : 'Item not found'}</p>
                        <p className="orderItemAmount">{orderItem.amount} шт.</p>
                        <p className="orderItemSum">{orderItem.sum} ₴</p>
                        <button className="ButtonDeleteFromCart Button" onClick = { () => deleteItemFromCart(orderItem._id)}>Видалити з кошика</button>
                    </div>
                </section>
            )})}
            <p className="finalSum">Сума: {finalSum} ₴</p>
            <a href="./order" className="Button ButtonSendOrder">Оформити замовлення</a>
        </div>
    )
};

export default Cart;
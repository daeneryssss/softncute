import React, { useState } from "react";
import Axios from "axios";

const Order = () => {
    const [formData, setFormData] = useState({
        personsname: "",
        personsphone: "",
        personsemail: "",
        personscountry: "",
        personsregion: "",
        personscity: "",
        personsaddress: "",
        postcode: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post("http://localhost:3000/sendOrder", {
                client: formData.personsname,
                orderItems: formData.orderItems,
                country: formData.personscountry,
                region: formData.personsregion,
                city: formData.personscity,
                address: formData.personsaddress,
                postcode: formData.postcode,
                phone: formData.personsphone,
                email: formData.personsemail
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };    

    return (
        <div className="Main">
            <a href="/cart" className="Button ButtonBackToCart">Повернутися до кошику</a>
            <form onSubmit={handleSubmit} className="orderForm">
                <label htmlFor="personsname">Введіть ПІБ:</label>
                <input type="text" name="personsname" id="personsname" onChange={handleChange} />
                <label htmlFor="personsphone">Введіть телефон:</label>
                <input type="tel" name="personsphone" id="personsphone" onChange={handleChange} />
                <label htmlFor="personsemail">Введіть електронну пошту:</label>
                <input type="email" name="personsemail" id="personsemail" onChange={handleChange} />
                <label htmlFor="personscountry">Країна:</label>
                <input type="text" name="personscountry" id="personscountry" onChange={handleChange} />
                <label htmlFor="personsregion">Область (регіон):</label>
                <input type="text" name="personsregion" id="personsregion" onChange={handleChange} />
                <label htmlFor="personscity">Місто (селище, село):</label>
                <input type="text" name="personscity" id="personscity" onChange={handleChange} />
                <label htmlFor="personsaddress">Адреса:</label>
                <input type="text" name="personsaddress" id="personsaddress" onChange={handleChange} />
                <label htmlFor="postcode">Поштовий індекс</label>
                <input type="number" name="postcode" id="postcode" onChange={handleChange} />
                <button type="submit" className="Button ButtonSubmitOrder">Оформити замовлення</button>
            </form>
        </div>
    )
};

export default Order;
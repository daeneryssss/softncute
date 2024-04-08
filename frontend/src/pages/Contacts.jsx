import React from "react";

const Contacts = () => {
    return (
        <div className="Main">
            <p className="MainText">Із нами можна зв'язатися за наступними контактами:</p>
            <ul>
                <li className="Contact">Номер телефону: +38(050)749-68-49</li>
                <li className="Contact">Особистий телеграм контакт: @vasylieva_d</li>
                <li className="Contact">Телеграм канал: <a href="https://t.me/softncute" className="ContactLink">тиць</a></li>
                <li className="Contact">Інстаграм сторінка: <a href="https://www.instagram.com/_soft.n.cute_?igsh=N292NDl1Nm1ncDF3" className="ContactLink">тиць</a></li>
                <li className="Contact">Тік-ток сторінка: <a href="https://www.tiktok.com/@_soft.n.cute_?_t=8lIzvQUtrQz&_r=1" className="ContactLink">тиць</a></li>
            </ul>
        </div>
    )
};

export default Contacts;
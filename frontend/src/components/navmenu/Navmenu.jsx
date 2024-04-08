import React from "react";
import './Navmenu.css';
import logo from '../images/yarn_logo.png';
import cart_icon from '../images/cart.png'
import profile_icon from '../images/profile.png';

const Navmenu = ({ isAuth }) => {
    return (
        <header className="PageHeader">
            <a href="/" className="PageHeaderLogo">
                <img src={logo} alt="Logo" className="PageHeaderLogoImage" />
                <p className="PageHeaderLogoText">Soft & Cute</p>
            </a>
            <ul className="Menu">
                <li className="MenuItem"><a href="/assortment" className="MenuItemLink">Асортимент</a></li>
                <li className="MenuItem"><a href="/about" className="MenuItemLink">Про нас</a></li>
                <li className="MenuItem"><a href="/contacts" className="MenuItemLink">Контакти</a></li>
            </ul>
            <ul className="MenuIcons">
                { isAuth ? (
                    <li className="MenuItem MenuIconImage"><a href="/profile" className="MenuItemLink"><img src={profile_icon} alt="Profile" className="ProfileMenuIcon"/></a></li>
                ) : (
                    <li className="MenuItem MenuIconImage"><a href="/registration" className="MenuItemLink"><img src={profile_icon} alt="Profile" className="ProfileMenuIcon"/></a></li>
                )}
                <li className="MenuItem MenuIconImage"><a href="/cart" className="MenuItemLink"><img src={cart_icon} alt="Cart" className="CartMenuIcon"/></a></li>
            </ul>
        </header>
    )
};

export default Navmenu;
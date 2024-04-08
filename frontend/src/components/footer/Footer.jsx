import React from "react";
import './Footer.css';

import instagram_icon from '../images/instagram.png';
import telegram_icon from '../images/telegram.png';
import tiktok_icon from '../images/tik-tok.png';

const Footer = () => {
    return (
        <footer className="Footer">
            <p className="FooterText">Слідкуйте за нами в соціальних мережах!</p>
            <div className="SocialLinks">
                <a href="https://www.instagram.com/_soft.n.cute_?igsh=N292NDl1Nm1ncDF3"><img src={instagram_icon} alt="Instagram" className="SocialLinkIcon" /></a>
                <a href="https://t.me/softncute"><img src={telegram_icon} alt="Telegram" className="SocialLinkIcon" /></a>
                <a href="https://www.tiktok.com/@_soft.n.cute_?_t=8lIzvQUtrQz&_r=1"><img src={tiktok_icon} alt="Tik-tok" className="SocialLinkIcon" /></a>
            </div>
            <p className="FooterText">© 2024 - Всі права захищені.</p>
        </footer>
    )
};

export default Footer;
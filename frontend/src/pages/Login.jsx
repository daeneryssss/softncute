import React from "react";

const Login = () => {
    return (
        <div className="Main">
            <p className="MainText">Зайти в профіль</p>
            <p className="MainText">Ой! Ви ще не маєте профілю? <a href="/registration">Тиць сюди, щоб зареєструватися</a></p>
        </div>
    )
};

export default Login;
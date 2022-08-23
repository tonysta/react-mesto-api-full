import React from 'react';
import logo from "../images/logo-w.svg";
import {Link} from "react-router-dom";

function Header({userData}) {

    const link = () => {
        if (userData) {
          return <p className="auth__link_type_exit" style={{marginLeft: "24px"}}>Выйти</p>
        } else if (!userData && window.location.pathname === "/sign-up") {
            return <Link to="/sign-in" className="auth__link" style={{marginLeft: "24px"}}>Войти</Link>
        } else {
            return <Link to="/sign-up" className="auth__link" style={{marginLeft: "24px"}}>Регистрация</Link>
        }
    }

    return (
        <header className="header">
            <img src={logo} alt="логотип" className="header__logo"/>
            <div className="header__container">
                <p className="auth__link_type_user-data">{userData?.email}</p>
                {link()}
            </div>
        </header>
    )
}

export default Header;
import React from "react";
import {register} from "../utils/auth.js";
import {Link} from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function Register ({isOpen, onClose, open}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [success, setSuccess] = React.useState(null);

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        register(
            password,
            email
        ).then((res) => {
                setSuccess(true);
        }).catch((err) =>{
            setSuccess(false);
            console.log(err)
        })
            .finally((res) =>{
                open();
                setEmail('');
                setPassword('');
            });
    }

    return (
        <div className="auth">
        <form onSubmit={handleSubmit} className="auth__form" name="register">
            <h1 className="auth__title">Регистрация</h1>
            <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email || ''}
                onChange={handleEmailChange}
                className="auth__input"
            />
            <input
                type="text"
                placeholder="Пароль"
                required
                name="password"
                minLength="8"
                maxLength="20"
                value={password || ''}
                onChange={handlePasswordChange}
                className="auth__input"
            />
            <button className="auth__submit" type="submit">Зарегистрироваться</button>
            <p className="auth__text">Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link></p>

        </form>
            <InfoTooltip isOpen={isOpen} onClose={onClose} success={success}/>
        </div>
    )
}

export default Register;
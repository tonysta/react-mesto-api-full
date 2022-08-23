import React from "react";
import {login} from "../utils/auth";
import {useNavigate} from "react-router-dom";


function Login ({handleLogin, setData}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        login(password, email)
            .then((data) => {
                if(data.token) {
                    localStorage.setItem('token', data.token);
                    setData({email});
                    handleLogin();
                    navigate("/");
                    setEmail('');
                    setPassword('');
                } else {
                    console.log(data.message);
                }

            }).catch((err) => console.log(err));

    }

    return (
        <div className="auth">
            <form className="auth__form" name="login" onSubmit={handleSubmit}>
                <h1 className="auth__title">Вход</h1>
                <input
                type="email"
                placeholder="Email"
                required
                name="email"
                className="auth__input"
                onChange={handleEmailChange}
                value={email}
                />
                <input
                type="text"
                placeholder="Пароль"
                required
                name="password"
                minLength="8"
                maxLength="20"
                className="auth__input"
                onChange={handlePasswordChange}
                value={password}
                />
                <button className="auth__submit" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;
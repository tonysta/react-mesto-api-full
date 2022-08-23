import React from "react";
import res from "../images/res.svg";
import err from "../images/err.svg";

function InfoTooltip ({isOpen, onClose, success}) {

    return (
        <div className={`popup ` + (isOpen && 'popup_type_active')}>
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close-btn"
                    onClick={onClose}
                />
                <img className="popup__image" src={success ? res : err}/>
                <h2 className="popup__text">{success ? ('Вы успешно зарегистрировались!'): ('Что-то пошло не так! Попробуйте ещё раз.')} </h2>
            </div>
        </div>
    )
}

export default InfoTooltip;
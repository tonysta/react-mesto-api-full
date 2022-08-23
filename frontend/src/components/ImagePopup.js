import React from "react";

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup viewer `+(card !== null ? 'popup_type_active': '')}>
            <div className="viewer__container">
                <button
                    type="button"
                    className="viewer__close-btn popup__close-btn"
                    onClick={onClose}
                />
                <img src={card?.link} alt={card?.name} className="viewer__img"/>
                <h2 className="viewer__title">{card?.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;
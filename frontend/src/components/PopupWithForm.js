import React from 'react';

function PopupWithForm({name, title, isOpen, onOpen, onSubmit, children}) {
    return(
        <div className={`popup popup_section_${name} ` + (isOpen && 'popup_type_active')}>
            <div className="popup__container">
                <button type="button" className="popup__close-btn" onClick={onOpen}></button>
                <form name={name} className={`popup__form popup__form_type_${name}`} onSubmit={onSubmit}>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button type="submit" className="popup__submit">Сохранить</button>
                </form>
            </div>
        </div>
    )
}
export default PopupWithForm;
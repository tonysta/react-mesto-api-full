import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const nameRef = useRef();
    const linkRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        });
    }

    useEffect(function() {
        nameRef.current.value = '';
        link: linkRef.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm title='Новое место' name ='card' isOpen={isOpen} onOpen={onClose} onSubmit={handleSubmit}>
            <label className="popup__field">
                <input
                    type="text"
                    placeholder="Название"
                    name="title"
                    className="popup__input popup__input_type_name"
                    required
                    minLength="2"
                    maxLength="30"
                    ref={nameRef}
                />
                <span className="popup__input-error title-error"></span>
            </label>
            <label className="popup__field">
                <input
                    type="url"
                    placeholder="Ссылка на картинку"
                    name="link"
                    className="popup__input popup__input_type_link"
                    required
                    ref={linkRef}
                />
                <span className="popup__input-error link-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
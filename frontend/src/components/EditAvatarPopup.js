import React, {useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onOpen, onUpdateAvatar}) {

    const linkRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: linkRef.current.value,
        });
    }

    useEffect(function() {
        linkRef.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm title='Обновить аватар' name='avatar' isOpen={isOpen} onOpen={onOpen} onSubmit={handleSubmit}>
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

export default EditAvatarPopup;
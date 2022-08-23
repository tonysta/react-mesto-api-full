import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(event) {
        setName(event.target.value);
    }
    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm title = 'Редактировать профиль' name = 'profile' isOpen={isOpen} onOpen={onClose} onSubmit={handleSubmit}>
            <label className="popup__field">
                <input
                    type="text"
                    name="name"
                    placeholder="Иван Иванов"
                    className="popup__input popup__input_type_name"
                    required
                    minLength="2"
                    maxLength="40"
                    value={name || ''}
                    onChange={handleNameChange}
                />
                <span className="popup__input-error name-error"></span>
            </label>
            <label className="popup__field">
                <input
                    type="text"
                    name="profession"
                    placeholder="Инженер"
                    className="popup__input popup__input_type_profession"
                    required
                    minLength="2"
                    maxLength="200"
                    value={description || ''}
                    onChange={handleDescriptionChange}
                />
                <span className="popup__input-error profession-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
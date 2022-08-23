import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { checkToken } from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();


  useEffect(function () {
    api.getProfileInfo().then((userInfo) => {
      setCurrentUser(userInfo);
    }).catch((err) => { console.log(err) });
  }, []);

  useEffect(function () {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token).then((res) => {
        const userData = {
          email: res.data.email
        };
        setUserData(userData);
        setLoggedIn(true);
        navigate("/");
      }).catch((err) => { console.log(err) });
    }
  }

  function handleLogin() {
    setLoggedIn(true)
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function openInfoTooltip() {
    setInfoTooltipOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true);
  }
  function handleUserData(data) {
    setUserData(data);
  }

  function closeAllPopups() {
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(data) {
    api.patchProfile(data).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch((err) => { console.log(err) });
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch((err) => { console.log(err) });
  }

  useEffect(function () {
    api.getCards().then((cards) => {
      setCards(cards);
    }).catch((err) => { console.log(err) });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => { console.log(err) });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((item) => item._id !== card._id));
    }).catch((err) => { console.log(err) });
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => { console.log(err) });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="background">
        <div className="page">
          <Header userData={userData} />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete} />
              </ProtectedRoute>
            } />

            <Route path="sign-up" element={<Register isOpen={infoTooltipOpen} onClose={closeAllPopups} open={openInfoTooltip} />} />
            <Route path="sign-in" element={<Login handleLogin={handleLogin} setData={handleUserData} />} />

          </Routes>

          <EditProfilePopup isOpen={isEditProfileOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlaceOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <PopupWithForm title='Вы уверены?' name='delete' />
          <EditAvatarPopup isOpen={isEditAvatarOpen} onOpen={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />


          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

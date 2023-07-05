import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser (newUserInfo) {
    api
      .setUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDeleteClick={handleCardDelete}
          />
          <Footer />

          <PopupWithForm name="form-avatar" title="Обновить аватар" buttonText='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
              <label className="popup__field">
                <input 
                    id="avatar-input"
                    autoComplete="off"
                    type="url"
                    name="avatarLink"
                    className="popup__input popup__url-input-avatar"
                    placeholder="Ссылка на картинку"
                    required
                />
                <span id="avatar-input-error" className="popup__input-error"/>
              </label>
          </PopupWithForm>
          
          <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
          
          <PopupWithForm name="add-element" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
            <label className="popup__field">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                className="popup__input popup__place-input"
                required
              />
            <span id="title-error" className="form__input-error"></span>
              <input
                type="url"
                name="link"
                id="link"
                placeholder="Ссылка на картинку"
                className="popup__input popup__url-input"
                required
              />
            <span id="link-error" className="form__input-error"></span>
              <button type="submit" className="form__submit" >
              </button>
            </label>
          </PopupWithForm>

          <div className={`popup popup_delete-card ${isConfirmationPopupOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
              <button type="button" className="popup__close-button popup__close-delete-card" onClick={closeAllPopups}></button>
              <h3 className="popup__title">Вы уверены?</h3>
              <form
                name="delete-form"
                action="#"
                className="popup__input-list popup__element-delete-card"
              >
                <button type="submit" className="popup__save-button">
                </button>
              </form>
            </div>
          </div>
          

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>    
  );
}

export default App;
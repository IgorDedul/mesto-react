import React from "react";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser}) => {
    const currentUser = useContext(CurrentUserContext);

    // Переменные с стейтами имени и информации о пользователе
    const [name, setName] = React.useState([]);
    const [description, setDescription] = React.useState([]);
  
 
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]); 


    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name,
          about: description,
        });
      } 
  

    return (
        <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <label className="popup__field">  
          <input
              type="text"
              id="name-input"
              className="popup__input popup__name-input"
              name="userName"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              onChange={name}
              required
          />
          <span id="name-input-error" className="popup__input-error"/>
        </label>
        <label className="popup__field">  
          <input
              type="text"
              id="about-input"
              className="popup__input popup__input_edit-about"
              name="about"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              onChange={description}
              required
          />
          <span id="about-input-error" className="popup__input-error"/>
        </label>  
      </PopupWithForm>
    );
  };
  
  export default EditProfilePopup;
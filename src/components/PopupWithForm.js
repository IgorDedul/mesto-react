import React from "react";

const PopupWithForm = (props) => {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <div className="popup__content">  
          <h3 className="popup__title">{props.title}</h3>
          <form
            name={`${props.name}`}
            action="#"
            className="popup__input-list"
            onSubmit={props.onSubmit}>
            {props.children}
          </form>
        </div>  
      </div>
    </div>
  );
};

export default PopupWithForm;
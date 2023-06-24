import React from "react";

const Card = ({ card, onCardClick, onCardLike, onCardDeleteClick }) => {

 //Вызовы функций увеличения, лайка, удаления
  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDeleteClick(card._id);
  };

  return (
    <>
        <div className="element__card">
            <button 
                onClick={handleDeleteClick}
                className="element__delete-button" 
                type="button" 
                aria-label="Удалить"/>   
            <img 
                src={card.link}
                alt={card.name}
                onClick={handleClick}
                className="element__image"/>
            <div className="element__border"> 
                <h2 className="element__name">{card.name}</h2>
                <div className="element__like-container">
                <button 
                    className= "element__like"
                    onClick={handleLikeClick}
                    type="button" 
                    aria-label="Нравится">
                </button>
                <p className="element__like-counter">{card.likes.length}</p>
                </div>  
            </div>
        </div>
    </> 
  );
};

export default Card;
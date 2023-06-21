import React, { useContext } from "react";
const CurrentUserContext = React.createContext();

const Card = ({ card, onCardClick, onCardLike, onCardDeleteClick }) => {
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся пользователь автором текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, наличие у карточки лайка, поставленный пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Переменная класса для кнопки лайка с переключением
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

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
            {isOwn && <button 
                onClick={handleDeleteClick}
                className="element__delete-button" 
                type="button" 
                aria-label="Удалить"/>  
            } 
            <img 
                src={card.link}
                alt={card.name}
                onClick={handleClick}
                class="element__image"/>
            <div className="element__border"> 
                <h2 className="element__name">{card.name}</h2>
                <div className="element__like-container">
                <button 
                    className={cardLikeButtonClassName}
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
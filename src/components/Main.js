import React from "react";
import Card from "./Card";


function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete, userData}) {

  const userAvatar = userData.avatar;
  const userName = userData.name;
  const userDescription = userData.about;

    return (
      <>
         <main>
            <section className="profile">
              <div className="profile__container">
                <div className="profile__container-avatar">
                  <img 
                    src={userAvatar} 
                    alt="Фото-аватар" 
                    className="profile__avatar"
                  />
                  <button 
                    onClick={onEditAvatar}
                    className="profile__avatar-edit" 
                    type="button" 
                    aria-label="Редактировать аватар">
                  </button>
                </div>
                <div className="profile__describe">
                  <div className="profile__title-wrapper">
                    <h1 className="profile__title">{userName}</h1>
                    <button 
                        onClick={onEditProfile}
                        className="profile__edit-button" 
                        type="button" 
                        aria-label="Редактировать профиль">
                    </button>
                  </div>
                  <p className="profile__subtitle">{userDescription}</p>
                </div>
              </div>
              <button 
                onClick={onAddPlace}
                className="profile__add-button" 
                type="button" 
                aria-label="Добавить профиль">
              </button>
            </section>

            <section className="element">
              <div className ="element__list">
                {cards.map((card) => {
                  return (
                    <Card
                      key={card._id}
                      card={card}
                      onCardClick={onCardClick}
                      onCardLike={onCardLike}
                      onCardDeleteClick={onCardDelete}
                    />
                  );
                })}
              </div>
            </section>  
        </main>
      </>
    );
  };
  
export default Main;
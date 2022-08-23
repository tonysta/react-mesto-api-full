import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`;
    return(
        <div className="card" >
            {isOwn ? <button type="button" className="card__trash-btn" onClick={() => onCardDelete(card)}></button>:null}
            <img src={card.link} alt={card.name} className="card__img" onClick={() => onCardClick(card)}/>
            <div className="card__heading">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={() => onCardLike(card)}></button>
                    <span className="card__like-counter">{card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}
export default Card;
import {deleteMyCard, addLike, deleteLike} from './api.js'

export function createCard(card, userId, deleteCard, likeCard, showImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const itemCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = itemCard.querySelector('.card__image');
    const cardTitle = itemCard.querySelector('.card__title');
    const cardLikeCounter = itemCard.querySelector('.card__like-counter');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name; 
    
    if (card.owner._id != userId) {
        itemCard.querySelector('.card__delete-button').remove();
    } else {
        itemCard.querySelector('.card__delete-button').addEventListener('click', (evt) => deleteCard(evt, card));
    }
    
    
    itemCard.querySelector('.card__like-button').addEventListener('click', (evt) => likeCard(evt, card));
    if (card.likes.some((like) => like._id === userId)) { 
        itemCard.querySelector(".card__like-button").classList.add("card__like-button_is-active"); 
    }
    
    cardLikeCounter.textContent = card.likes.length; 

    cardImage.addEventListener('click', () => {showImage(card.link, card.name);});
    return itemCard;
}

export function deleteCard(evt, card) {
    const cardDel = evt.target.closest('.card');
    deleteMyCard(card._id)
        .then(() => {
            cardDel.remove();
        })
        .catch((err) => {
            console.log(`Ошибка, не выполенено: ${err.status}`);
          })
}

export function likeCard(evt, card) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
        deleteLike(card._id)
            .then((res)=>{
                evt.target.classList.remove('card__like-button_is-active');
                evt.target.closest('.card').querySelector('.card__like-counter').textContent = res.likes.length;
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
    } else {
        addLike(card._id)
            .then((res)=>{
                evt.target.classList.add('card__like-button_is-active');
                evt.target.closest('.card').querySelector('.card__like-counter').textContent = res.likes.length;
            })
            .catch(err => console.log(`Ошибка.....: ${err}`))
    }
}
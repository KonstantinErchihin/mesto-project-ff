import '../pages/index.css'; // импорт главного файла стилей

import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getProfileInfo, getInitialCards, updateProfileInfo, addCard, getAvatar, newAvatar} from './api.js'
const placesList = document.querySelector('.places__list'); 

const modalProfile = document.querySelector('.popup_type_edit'); 
const modalNewCard = document.querySelector('.popup_type_new-card'); 
const modalNewAvatar = document.querySelector('.popup_type_avatar');

const buttonOpenModalProfile = document.querySelector('.profile__edit-button'); 
const buttonOpenModalNewCard = document.querySelector('.profile__add-button'); 
const buttonOpenModalNewAvatar = document.querySelector('.profile__image'); 

const popupCloseButtons = document.querySelectorAll('.popup__close'); 

const formElementProfile = modalProfile.querySelector('.popup__form'); 
const nameInput  = formElementProfile.querySelector('.popup__input_type_name'); 
const jobInput  = formElementProfile.querySelector('.popup__input_type_description'); 

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formElementCard = modalNewCard.querySelector('.popup__form');
const imageName = formElementCard.querySelector('.popup__input_type_card-name'); 
const urlImage = formElementCard.querySelector('.popup__input_type_url'); 

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const formElementAvatar = modalNewAvatar.querySelector('.popup__form'); 
const urlAvatar = formElementAvatar.querySelector('.popup__input_type_url_img'); 
const avatarImg = document.querySelector('.profile__image');

let userId = null;

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

buttonOpenModalProfile.addEventListener('click', () => {
    openModal(modalProfile);
    clearValidation(formElementProfile, validationConfig);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});
buttonOpenModalNewCard.addEventListener('click', () => {
    formElementCard.reset();
    openModal(modalNewCard);
    clearValidation(formElementCard, validationConfig);
});
buttonOpenModalNewAvatar.addEventListener('click', () => {
    formElementAvatar.reset();
    openModal(modalNewAvatar);
    clearValidation(formElementAvatar, validationConfig);
});

popupCloseButtons.forEach((item) => {
    item.addEventListener("click", () => {
      const modalElement = item.closest('.popup');
      closeModal(modalElement);
    });
});

function handleFormSubmitAvatar(evt) {
    evt.preventDefault();
    evt.submitter.textContent = "Сохранение...";
    const newLinkAvatar = urlAvatar.value;
    newAvatar(newLinkAvatar)
        .then((newLink) => {
            avatarImg.style.backgroundImage = `url(${newLink.avatar})`;
            closeModal(modalNewAvatar);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            evt.submitter.textContent = "Сохранить";
        })
}

formElementAvatar.addEventListener('submit', handleFormSubmitAvatar);

function handleFormSubmitProfile(evt) {
    evt.preventDefault(); 
    evt.submitter.textContent = 'Сохранение...';
    const userData = {
        name: nameInput.value,
        about: jobInput.value};
    updateProfileInfo(userData)
        .then(() => {
            profileTitle.textContent = nameInput.value;
            profileDescription.textContent = jobInput.value;
            closeModal(modalProfile);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        })
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile);

function handleFormSubmitCard(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Создать';
    const newCard = {
        name: imageName.value,
        link: urlImage.value,
    }
    addCard(newCard)
        .then((newCardData) => {
            placesList.prepend(createCard(newCardData, newCardData.owner._id, deleteCard, likeCard, showImage));
            closeModal(modalNewCard);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        })
}

formElementCard.addEventListener('submit', handleFormSubmitCard);

function showImage(link, name) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(popupTypeImage);
}

enableValidation(validationConfig);

Promise.all([getProfileInfo(), getInitialCards()])
    .then(([userData, initialCards]) => {
        userId = userData._id;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        avatarImg.style.backgroundImage = `url(${userData.avatar})`;
        initialCards.forEach((card) => {
            const cardAdd = createCard(card, userId, deleteCard, likeCard, showImage);
            placesList.append(cardAdd);
        });
    })
    .catch(error => {
        console.error('Ошибка: ', error);
    })

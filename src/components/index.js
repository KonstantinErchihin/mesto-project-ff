import '../pages/index.css'; // импорт главного файла стилей
import {cards} from './cards.js' 
import {createCard, cardDelete, likeCard} from './card.js'
import {openModal, closeModal} from './modal.js' 

const placeList = document.querySelector('.places__list');
const modalProfile = document.querySelector('.popup_type_edit');
const modalNewCard = document.querySelector('.popup_type_new-card');
const buttonOpenModalProfile = document.querySelector('.profile__edit-button');
const buttonOpenModalNewCard = document.querySelector('.profile__add-button');
const buttonClosePopup = document.querySelectorAll('.popups__close');
const formElementProfile = modalProfile.querySelector('.popup__form');
const nameInput  = formElementProfile.querySelector('.popup__input_type_name');
const jobInput  = formElementProfile.querySelector('.popup__input_type_description');
const formElementCard = modalNewCard.querySelector('.popup__form');
const imageName = formElementCard.querySelector('.popup__input_type_card-name');
const urlImage = formElementCard.querySelector('.popup__input_type_url');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

cards.forEach((card) => {
  const cardAdd = createCard(card, cardDelete, likeCard, showImage);
  placeList.append(cardAdd);
});

buttonOpenModalProfile.addEventListener('click', () => {
  openModal(modalProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});
buttonOpenModalNewCard.addEventListener('click', () => {
  openModal(modalNewCard);
});

buttonClosePopup.forEach((item) => {
  item.addEventListener("click", () => {
    const modalElement = item.closest(".popup");
    closeModal(modalElement);
  });
});

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closeModal(modalProfile);
}

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const newCard = {
      name: imageName.value,
      link: urlImage.value
  }
  placeList.prepend(createCard(newCard, cardDelete, likeCard, showImage));
  formElementCard.reset();
  closeModal(modalNewCard);
}

function showImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
}

formElementCard.addEventListener('submit', handleFormSubmitCard);
formElementProfile.addEventListener('submit', handleFormSubmitProfile);
import './pages/index.css';
import { newPlace, addPlace } from './components/card.js';
import { addPopupCloseListener, closePopupByEscClick, popupValidation, openPopup } from './components/modal.js';
import { enableFormValidation, formSubmitHandler, formSubmitPlaceHandler } from './components/validate.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

//нажимаем кнопку редактировать профиль

const editButton = document.querySelector('.profile__button-edit');
const editPopupContainer = document.querySelector('.popup__container_type_edit');
const editPopup= editPopupContainer.closest('.popup');
const nameInput = editPopupContainer.querySelector('#person');
const jobInput = editPopupContainer.querySelector('#profession');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile-edit__title');
const profileJob = profile.querySelector('.profile-edit__subtitle');

//нажимаем кнопку добавить место

const addButton = document.querySelector('.profile__button-add');
const addPopupContainer = document.querySelector('.popup__container_type_add');
const addPopup= addPopupContainer.closest('.popup');

//нажимаем кнопку закрыть

const closeButtons = document.querySelectorAll('.popup__button-close');

//нажимаем кнопку сохранить

const submitButtons = document.querySelectorAll('.form__button-submit');

//редактирование информации в профиле

const formProfileElement = editPopupContainer.querySelector('.form');

//добавляем новое место

const formPlaceElement = addPopupContainer.querySelector('.form');

// передача настроек

enableFormValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
});

// закрыть popup кликом на оверлей

popupValidation();

// закрыть popup нажатием клавиши Esc

document.addEventListener('keyup', closePopupByEscClick);

//нажимаем кнопку редактировать профиль

editButton.addEventListener('click', function(event){
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

//нажимаем кнопку добавить карточку

addButton.addEventListener('click', function(event){
  openPopup(addPopup);
});

//нажимаем кнопку закрыть

addPopupCloseListener(closeButtons);

//нажимаем кнопку сохранить

addPopupCloseListener(submitButtons);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formProfileElement.addEventListener('submit', formSubmitHandler);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formPlaceElement.addEventListener('submit', formSubmitPlaceHandler);

//инициализация страницы

initialCards.forEach(function(item){
  const card = newPlace(item.name, item.link);
  addPlace(card);
});
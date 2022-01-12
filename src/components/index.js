import '../pages/index.css';
// import { initialCards } from "./constants.js";
import { addPopupListener, openPopup, closePopup } from './modal.js';
import { enableFormValidation } from './validate.js';
import { addPlace, newPlace } from './card.js';

// нажимаем кнопку редактировать профиль

const editButton = document.querySelector('.profile__button-edit');
const editPopupContainer = document.querySelector('.popup__container_type_edit');
const editPopup= editPopupContainer.closest('.popup');
const nameInput = editPopupContainer.querySelector('#person');
const jobInput = editPopupContainer.querySelector('#profession');
const profile = document.querySelector('.profile');
const profileAvatar = profile.querySelector('.profile__img');
const profileName = profile.querySelector('.profile-edit__title');
const profileJob = profile.querySelector('.profile-edit__subtitle');
const profileEdit = document.querySelector('.profile__edit-label');

// изменить аватар

const avatarPopupContainer = document.querySelector('.popup__container_type_avatar');
const avatarPopup = avatarPopupContainer.closest('.popup');
const avatarLink = avatarPopupContainer.querySelector('#avatar-link');
const avatarForm = avatarPopupContainer .querySelector('.form');

// нажимаем кнопку добавить место

const addButton = document.querySelector('.profile__button-add');
const addPopupContainer = document.querySelector('.popup__container_type_add');
const addPopup= addPopupContainer.closest('.popup');
const placeInput = addPopupContainer.querySelector('#place');
const imageLinkInput = addPopupContainer.querySelector('#image-link');

// нажимаем кнопку закрыть

const closeButtons = document.querySelectorAll('.popup__button-close');

// редактирование информации в профиле

const profileForm = editPopupContainer.querySelector('.form');

// добавляем новое место

const addCardForm = addPopupContainer.querySelector('.form');
const placeSubmitButton = addCardForm.querySelector('.form__button-submit');

// Обработчики форм

const elements = document.querySelector('.elements');
const imagePopupContainer = document.querySelector('.popup__container_type_image');
const imagePopup = imagePopupContainer.closest('.popup');

// данные о пользователе

let currentUser = '';

function getUser() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-5/users/me', {
    headers: {
      authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be'
    }
  })
}

function showUser () {
  getUser()
    .then(res=>res.json())
    .then((result)=>{
      profileAvatar.setAttribute('src', result.avatar);
      profileName.textContent = result.name;
      profileJob.textContent = result.about;
      currentUser = result._id;
  });  
}

// карточки

function getCards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-5/cards', {
    headers: {
      authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be'
    }
  })
}

function showCards () {
  getCards()
    .then(res=>res.json())
    .then((result)=>{
      result.forEach(function(item){
      const card = newPlace(item, currentUser);
      addPlace(card);
    });
  }); 
}

// добавить карточку

function postCard () {
  return fetch('https://nomoreparties.co/v1/plus-cohort-5/cards', {
    method: 'POST',
    headers: {
      authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      name: placeInput.value,
      link: imageLinkInput.value
    })
  })
}

function showNewCard () {
  postCard ()
    .then(res=>res.json())
    .then((result)=>{
      const card = newPlace(result, currentUser);
      addPlace(card);
    });  
}

// обновить аватар

function showEdit (evt) {
  profileEdit.classList.add('profile__edit-label_show');
}

function hideEdit (evt) {
  profileEdit.classList.remove('profile__edit-label_show');
}

function addHoverAvatar (evt) {
  profileAvatar.classList.add('profile__img:hover')
}

function hideHoverAvatar (evt) {
  profileAvatar.classList.remove('profile__img:hover')
}

function updateAvatar(link) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-5/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${link}`,
    })
  });
}

function showUpdatedAvatar(link) {
  updateAvatar(link)
  .then(res=>res.json())
  .then((result)=>{
    profileAvatar.setAttribute('src', avatarLink.value);
    avatarLink.value = "";
  }); 
}

// Инициализировать страницу

function initPage() {
  // updateAvatar();
  showUser();
  showCards();
}

// Обработчик «отправки» формы

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  
  fetch('https://nomoreparties.co/v1/plus-cohort-5/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  });
  showUser(); 
  closePopup(editPopup);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function handlePlaceFormSubmit (evt) {
  evt.preventDefault();
  showNewCard ();
  addCardForm.reset();
  placeSubmitButton.disabled = true;
  placeSubmitButton.classList.add('form__button-submit_inactive');
  closePopup(addPopup);
}

function handleAvatarFormSubmit (evt) {
  evt.preventDefault();
  showUpdatedAvatar(avatarLink.value);
  closePopup(avatarPopup);
}

// передача настроек

enableFormValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
});

// закрыть popup кликои на оверлей или на крестик

addPopupListener();

// показать значок редактирования аватара

profileAvatar.addEventListener('mouseover', showEdit);
profileAvatar.addEventListener('mouseout', hideEdit);

profileAvatar.addEventListener('click', function(event){
  openPopup(avatarPopup);
});

profileEdit.addEventListener('mouseover', addHoverAvatar);
profileEdit.addEventListener('mouseout', hideHoverAvatar);

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

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

addCardForm.addEventListener('submit', handlePlaceFormSubmit);

avatarForm.addEventListener('submit', handleAvatarFormSubmit);

//инициализация страницы

initPage();


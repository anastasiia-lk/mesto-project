// необходимые импорты

import '../pages/index.css';
import { savingStatus, saveStatus, config } from "../utils/constants.js";
// import { addPopupListener, openPopup, closePopup } from './modal.js';
import { addPopupListener, openPopup, closePopup } from './modal.js';
import { enableFormValidation } from './validate.js';
import { addPlace, newPlace } from './card.js';
import Card from './card.js';
import UserInfo from './userInfo.js';
// import { getUser, updateUser, getCards, postCard, updateAvatar } from './api.js';
import { updateUser, postCard, updateAvatar } from './api.js';
import Api from './api.js';
import Popup from './popup';
import PopupWithImage from './popupWithImage';

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
const avatarSubmitButton = avatarForm.querySelector('.form__button-submit');

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
const profileSubmitButton = editPopupContainer.querySelector('.form__button-submit');

// добавляем новое место

const addCardForm = addPopupContainer.querySelector('.form');
const placeSubmitButton = addCardForm.querySelector('.form__button-submit');

// Обработчики форм

const elements = document.querySelector('.elements');
const imagePopupContainer = document.querySelector('.popup__container_type_image');
const imagePopup = imagePopupContainer.closest('.popup');

// данные для инициализации
// страницы

let currentUser = '';

const api = new Api ({
  baseUrl: config.baseUrl,
  headers: config.headers
})

const userInfo = new UserInfo(
  '.profile-edit__title', 
  '.profile-edit__subtitle', 
  {
    getUserData: () => api.getUser()
  }
);

function initPage () {

  Promise.all([userInfo.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
      // тут установка данных пользователя
      // profileAvatar.setAttribute('src', userData.avatar);
      // profileName.textContent = userData.name;
      // profileJob.textContent = userData.about;
      // currentUser = userData._id;
      
      console.log(userData, cards);
      userInfo.showUserInfo(userData.name, userData.about);

      const imagePopupElement = new PopupWithImage('.popup_type_image');
      imagePopupElement.setEventListeners();

      // и тут отрисовка карточек
      // cards.forEach(function(item){
      //   const card = newPlace(item, currentUser);
      //   addPlace(card);
      //   })
      cards.forEach(function(item){
        const card = new Card(
          item,
          '#place-template', 
          {
            setLike: (cardId) => {
              api.addLike(cardId)
              .then((result) => {
                card.calcLikes(result.likes)
              })
              .catch((err) => console.log(err))
            },
            removeLike: (cardId) => {
              api.deleteLike(cardId)
              .then((result) => {
                card.calcLikes(result.likes)
              })
              .catch((err) => console.log(err))
            },
            removeCard: (cardId) => {
              api.deleteCard(cardId)
              .then((result) => {
                card.eraseCard();  
              })
            },
            openImagePopup: () => {
              imagePopupElement.open(item.link, item.name);
            }
          },
          userInfo.getUserInfo()
        );
        addPlace(card.generate());
      })
    })
  .catch(err => {
    // тут ловим ошибку
    console.log(err);
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

// Обработчик «отправки» формы

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileSubmitButton.textContent = savingStatus;
  updateUser(nameInput.value, jobInput.value)
    .then((result)=>{
      profileName.textContent = result.name;
      profileJob.textContent = result.about;
    })
    .then((result)=>{
      closePopup(editPopup);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally((res) => {
      profileSubmitButton.textContent = saveStatus;
    })
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function handlePlaceFormSubmit (evt) {
  evt.preventDefault();
  placeSubmitButton.textContent = savingStatus;
  postCard (placeInput.value, imageLinkInput.value)
    .then((result)=>{
      const card = newPlace(result, currentUser);
      addPlace(card);
    })
    .then((result)=>{
      addCardForm.reset();
      placeSubmitButton.disabled = true;
      placeSubmitButton.classList.add('form__button-submit_inactive');
      closePopup(addPopup);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally((res) => {
      placeSubmitButton.textContent = saveStatus;
    })
}

function handleAvatarFormSubmit (evt) {
  evt.preventDefault();
  avatarSubmitButton.textContent = savingStatus;
  updateAvatar(avatarLink.value)
    .then((result)=>{
      profileAvatar.setAttribute('src', avatarLink.value);
      avatarLink.value = "";
      avatarSubmitButton.disabled = true;
      avatarSubmitButton.classList.add('form__button-submit_inactive');
    })
    .then((result)=>{
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally((res) => {
      avatarSubmitButton.textContent = saveStatus;
    })
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

// profileAvatar.addEventListener('mouseover', showEdit);
// profileAvatar.addEventListener('mouseout', hideEdit);

profileEdit.addEventListener('click', function(event){
  openPopup(avatarPopup);
});

// profileEdit.addEventListener('mouseover', addHoverAvatar);
// profileEdit.addEventListener('mouseout', hideHoverAvatar);

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


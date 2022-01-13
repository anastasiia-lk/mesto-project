import '../pages/index.css';
import { savingStatus, saveStatus } from "../utils/constants.js";
import { addPopupListener, openPopup, closePopup } from './modal.js';
import { enableFormValidation } from './validate.js';
import { addPlace, newPlace } from './card.js';
import { getUser, updateUser, getCards, postCard, updateAvatar } from './api.js';

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

// данные о пользователе

let currentUser = '';

function showUser () {
  getUser()
    .then((result)=>{
      profileAvatar.setAttribute('src', result.avatar);
      profileName.textContent = result.name;
      profileJob.textContent = result.about;
      currentUser = result._id;
    })
    .catch((err) => {
      console.log(err);
    })
}

// карточки

function showCards () {
  getCards()
    .then((result)=>{
      result.forEach(function(item){
      const card = newPlace(item, currentUser);
      addPlace(card);
      })
    })
    .catch((err) => {
      console.log(err)
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

// Инициализировать страницу

function initPage() {
  showUser();
  showCards();
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
    .catch((err) => {
      console.log(err)
    })
    .finally((res) => {
      profileSubmitButton.textContent = saveStatus;
      closePopup(editPopup);
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
    .catch((err) => {
      console.log(err)
    })
    .finally((res) => {
      addCardForm.reset();
      placeSubmitButton.disabled = true;
      placeSubmitButton.classList.add('form__button-submit_inactive');
      placeSubmitButton.textContent = saveStatus;
      closePopup(addPopup);
    })
}

function handleAvatarFormSubmit (evt) {
  evt.preventDefault();
  avatarSubmitButton.textContent = savingStatus;
  updateAvatar(avatarLink.value)
    .then((result)=>{
      profileAvatar.setAttribute('src', avatarLink.value);
      avatarLink.value = "";
    })
    .catch((err) => {
      console.log(err)
    })
    .finally((res) => {
      avatarSubmitButton.textContent = saveStatus;
      closePopup(avatarPopup);
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

// необходимые импорты

import '../pages/index.css';
import { CONFIG } from "../utils/constants.js";
import Card from './Card.js';
import UserInfo from './UserInfo.js';
import Api from './Api.js';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm';
import FormValidator from './FormValidator';
import Section from './Section';

// кнопки

const editAvatarBtn = document.querySelector('.profile__edit-label');
const editProfileBtn = document.querySelector('.profile__button-edit');
const addCardBtn = document.querySelector('.profile__button-add');

// инициализация Api

const api = new Api ({
  baseUrl: CONFIG.baseUrl,
  headers: CONFIG.headers
})

// инициализация валидаторов форм

const avatarFormValidator = new FormValidator({
  formSelector: '.avatar-form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
});

const userFormValidator = new FormValidator({
  formSelector: '.profile-form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
});

const cardFormValidator = new FormValidator({
  formSelector: '.place-form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
});

avatarFormValidator.enableFormValidation();
userFormValidator.enableFormValidation();
cardFormValidator.enableFormValidation();

// инициализация пользователя

const userInfo = new UserInfo(
  '.profile-edit__title', 
  '.profile-edit__subtitle',
  '.profile__img', 
  {
    getUserData: () => api.getUser(),
    handleSetAvatar: (avatarLink) => {
      avatarFormValidator.setSavingStatus();
      api.updateAvatar(avatarLink)
      .then((data) => {
        userInfo.updateUserInfo(data);
        avatarPopupElement.clearInput();
        avatarFormValidator.disableBtnElement();
        avatarFormValidator.setSaveStatus();
      })
      .then(() => {
        avatarPopupElement.close(); 
      })
      .catch((err) => {
        console.log(err)
      })
    },
    handleSetUser: (name, about) => {
      userFormValidator.setSavingStatus();
      api.updateUser(name, about)
      .then((data) => {
        userInfo.updateUserInfo(data);
        userPopupElement.clearInput();
        userFormValidator.disableBtnElement();
        userFormValidator.setSaveStatus();
      })
      .then(() => {
        userPopupElement.close(); 
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
);

// инициализация попапов

const imagePopupElement = new PopupWithImage({ 
  popupSelector: '.popup_type_image',
  popupOpenedSelector: 'popup_opened',
  btnCloseSelector: 'popup__button-close'}, {
  imgSelector: '.view-image__item',
  nameSelector: '.view-image__caption'
  });

const avatarPopupElement = new PopupWithForm({ 
  popupSelector: '.popup_type_avatar', 
  popupOpenedSelector: 'popup_opened',
  btnCloseSelector: 'popup__button-close' }, {
  formSelector: '.form',
  formInputSelector: '.form__item'
  }, {
  handleFormSubmit: ({'avatar-link': newAvatar}) => {
    userInfo.setUserAvatar(newAvatar);
   }
})

const cardPopupElement = new PopupWithForm({ 
  popupSelector: '.popup_type_card', 
  popupOpenedSelector: 'popup_opened',
  btnCloseSelector: 'popup__button-close' }, {
  formSelector: '.form',
  formInputSelector: '.form__item'
  }, {
  handleFormSubmit: ({'place': place, 'image-link': link}) => {
    api.postCard(place, link)
      .then((card) => section.addItem(card))
      .then(() => {
        cardPopupElement.close();
        cardPopupElement.clearInput();
        cardFormValidator.disableBtnElement();
      })
      .catch((err) => {
        console.log(err)
      })
   }
})

const userPopupElement = new PopupWithForm({ 
  popupSelector: '.popup_type_profile', 
  popupOpenedSelector: 'popup_opened',
  btnCloseSelector: 'popup__button-close' }, {
  formSelector: '.form',
  formInputSelector: '.form__item'
  },{
  handleFormSubmit: ({'person': name, 'profession': about}) => {
    userInfo.setUserData(name, about);
   }
})

// инициализация слушателей попапов

imagePopupElement.setEventListeners();
avatarPopupElement.setEventListeners();
userPopupElement.setEventListeners();
cardPopupElement.setEventListeners();

// инициализация секции с карточками

const section = new Section ({
  renderer: (item) => {
    const card = new Card (
      item,
      { cardTemplateSelector: '#place-template', 
        likeCaptionSelector: '.like-block__caption',
        likeBtnSelector: '.card__button-like',
        likeBtnActiveSelector: 'active',
        trashBtnSelector: '.card__button-trash',
        trashBtnCreatedSelector: 'card__button-trash_created',
        imgSelector: '.card__image',
        nameSelector: '.card__caption-name',
        cardSelector: '.card'}, {
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
      userInfo.getUserId()
    );
    return card.generate();
  },
  }, 
  '.elements'
);

// отрисовка страницы

function initPage () {
Promise.all([userInfo.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
      userInfo.showUserInfo(userData.name, userData.about, userData.avatar);
      userInfo.updateUserInfo(userData);

      userPopupElement.setInputValue('person', userData.name);
      userPopupElement.setInputValue('profession', userData.about); 

      section.addSection(cards);
    })
  .catch(err => {
    console.log(err);
  });
}

// инициализация слушателей кнопок

// нажимаем кнопку редактировать аватар

editAvatarBtn.addEventListener('click', function(event){
  avatarPopupElement.open();
});

// нажимаем кнопку редактировать профиль

editProfileBtn.addEventListener('click', function(event){
  userPopupElement.open();
  userInfo.getUserInfo()
    .then((userData) => {
      userPopupElement.setInputValue('person', userData.name);
      userPopupElement.setInputValue('profession', userData.about); 
    })
});

// нажимаем кнопку добавить карточку

addCardBtn.addEventListener('click', function(event){
  cardPopupElement.open();
});

// инициализация страницы

initPage();


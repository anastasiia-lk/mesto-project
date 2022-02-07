// необходимые импорты

import '../pages/index.css';
import { config } from "../utils/constants.js";
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
  baseUrl: config.baseUrl,
  headers: config.headers
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

avatarFormValidator.enableFormValidation();
userFormValidator.enableFormValidation();

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

const imagePopupElement = new PopupWithImage('.popup_type_image');

const avatarPopupElement = new PopupWithForm('.popup_type_avatar', {
  handleFormSubmit: ({'avatar-link': newAvatar}) => {
    userInfo.setUserAvatar(newAvatar);
   }
})

const cardPopupElement = new PopupWithForm('.popup_type_card', {
  handleFormSubmit: ({'place': place, 'image-link': link}) => {
    api.postCard(place, link)
      .then((card) => section.addItem(card))
      .then(() => {
        cardPopupElement.close();
      })
      .catch((err) => {
        console.log(err)
      })
   }
})

const userPopupElement = new PopupWithForm('.popup_type_profile', {
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
      '#place-template', {
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


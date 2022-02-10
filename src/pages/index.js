// необходимые импорты

import '../pages/index.css';
import { CONFIG, PROFILE_FORM_CONFIG, CARD_FORM_CONFIG, AVATAR_FORM_CONFIG } from "../utils/constants.js";
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';

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

const avatarFormValidator = new FormValidator(AVATAR_FORM_CONFIG);

const userFormValidator = new FormValidator(PROFILE_FORM_CONFIG);

const cardFormValidator = new FormValidator(CARD_FORM_CONFIG);

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
      avatarPopupElement.setSavingStatus();
      api.updateAvatar(avatarLink)
      .then((data) => {
        userInfo.updateUserInfo(data);
      })
      .then(() => {
        avatarPopupElement.close(); 
      })
      .finally(() => {
        avatarFormValidator.disableBtnElement();
        avatarPopupElement.setSaveStatus();
      })
      .catch((err) => {
        console.log(err)
      })
    },
    handleSetUser: (name, about) => {
      userPopupElement.setSavingStatus();
      api.updateUser(name, about)
      .then((data) => {
        userInfo.updateUserInfo(data);
      })
      .then(() => {
        userPopupElement.close(); 
      })
      .finally(() => {
        userFormValidator.disableBtnElement();
        userPopupElement.setSaveStatus();
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
  formInputSelector: '.form__item',
  formSubmitSelector: '.form__button-submit'
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
  formInputSelector: '.form__item',
  formSubmitSelector: '.form__button-submit'
  }, {
  handleFormSubmit: ({'place': place, 'image-link': link}) => {
    cardPopupElement.setSavingStatus();
    api.postCard(place, link)
      .then((card) => section.addItem(card))
      .then(() => {
        cardPopupElement.close();
      })
      .finally(() => {
        cardFormValidator.disableBtnElement();
        cardPopupElement.setSaveStatus();
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
  formInputSelector: '.form__item',
  formSubmitSelector: '.form__button-submit'
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
  avatarPopupElement.clearInput();
  avatarFormValidator.clearInputsError();
  avatarPopupElement.open();
});

// нажимаем кнопку редактировать профиль

editProfileBtn.addEventListener('click', function(event){
  userFormValidator.clearInputsError();
  cardFormValidator.disableBtnElement();
  userPopupElement.open();
  userInfo.getUserInfo()
    .then((userData) => {
      userPopupElement.setInputValue('person', userData.name);
      userPopupElement.setInputValue('profession', userData.about); 
    })
});

// нажимаем кнопку добавить карточку

addCardBtn.addEventListener('click', function(event){
  cardPopupElement.clearInput();
  cardFormValidator.clearInputsError();
  cardFormValidator.disableBtnElement();
  cardPopupElement.open();
});

// инициализация страницы

initPage();


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

const elements = document.querySelector('.elements');
const imagePopupContainer = document.querySelector('.popup__container_type_image');
const imagePopup = imagePopupContainer.closest('.popup');
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
const submitProfileButton = editPopupContainer.querySelector('.form__button-submit');
//добавляем новое место
const formPlaceElement = addPopupContainer.querySelector('.form');
const submitPlaceButton = addPopupContainer.querySelector('.form__button-submit');

//показать картинку в popup
function showPopupImage(imageLinkValue, placeValue){
  const newImage = imagePopupContainer.querySelector('.view-image__item');
  newImage.setAttribute('src', imageLinkValue);
  newImage.setAttribute('alt', placeValue);
  // imagePopupContainer.querySelector('.view-image__item').style.backgroundImage = `url('${imageLinkValue}')`;
  imagePopupContainer.querySelector('.view-image__caption').textContent = placeValue;
}

//открыть модальное окно
function openPopup(popup){
  popup.classList.add('popup_opened');
}

//закрыть модальное окно
function closePopup(popup){
  popup.classList.remove('popup_opened');
}

//создать карточку
function newPlace(placeValue, imageLinkValue) {

  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.card').cloneNode(true);
  
  const newViewImage = placeElement.querySelector('.card__image');
  newViewImage.setAttribute('src', imageLinkValue);
  newViewImage.setAttribute('alt', placeValue);
  placeElement.querySelector('.card__caption-name').textContent = placeValue;

  placeElement.querySelector('.card__button-like').addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('active');
});

placeElement.querySelector('.card__button-trash').addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  const deleteCard = eventTarget.closest('.card');
  deleteCard.remove();
});

newViewImage.addEventListener('click', function (evt) {
  openPopup(imagePopup);
  showPopupImage(imageLinkValue, placeValue);
});

  // elements.prepend(placeElement); 
  return placeElement;
}

//добавить карточку
function addPlace(element){
  elements.prepend(element); 
}

//добавить элементам слушатель открытия модального окна 
function addPopupOpenListener (element){
  element.forEach(function(item){
    item.addEventListener('click', function(event){
      const findPopup = item.closest('.popup');
      openPopup(findPopup);
    })
  })
}

//добавить элементам слушатель закрытия модального окна 
function addPopupCloseListener (element){
  element.forEach(function(item){
    item.addEventListener('click', function(event){
      const findPopup = item.closest('.popup');
      closePopup(findPopup);
    })
  })
}

// Обработчик ошибок при заполнении
// полей формы

const formError = formProfileElement.querySelector(`.${nameInput.id}-error`);

// Показать ошибку

function showError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__item-error_active');
}

// Скрыть ошибку

function hideError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__item_type_error');
  errorElement.classList.remove('form__item-error_active');
  errorElement.textContent = "";
}

// Проверка формы на корректность
// введенных данных

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideError(formElement, inputElement);
  }
}

const setEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__item'));
  const buttonElement = formElement.querySelector('.form__button-submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  })
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement);
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return (!inputElement.validity.valid);
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__button-submit_inactive')
  } else {
    buttonElement.classList.remove('form__button-submit_inactive');
  }
}

enableValidation();

// закрыть popup кликом на оверлей

const popupValidation = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popupElement);
      }
    })
  })
}

popupValidation();

//редактирование информации в профиле

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

//добавляем новое место

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitPlaceHandler (evt) {
  evt.preventDefault();
  const placeInput = addPopupContainer.querySelector('#place').value;
  const imageLinkInput = addPopupContainer.querySelector('#image-link').value;
  const card = newPlace(placeInput, imageLinkInput);
  addPlace(card);
  formPlaceElement.reset();
}

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
})
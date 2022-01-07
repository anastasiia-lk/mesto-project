import { newPlace, addPlace } from '../components/card.js';

const editPopupContainer = document.querySelector('.popup__container_type_edit');
const nameInput = editPopupContainer.querySelector('#person');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile-edit__title');
const profileJob = profile.querySelector('.profile-edit__subtitle');
const jobInput = editPopupContainer.querySelector('#profession');
const addPopupContainer = document.querySelector('.popup__container_type_add');

// Обработчик ошибок при заполнении
// полей формы

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

function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideError(formElement, inputElement);
  }
}

function setEventListener (formElement) {
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

function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement);
  });
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return (!inputElement.validity.valid);
  })
}

function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__button-submit_inactive')
  } else {
    buttonElement.classList.remove('form__button-submit_inactive');
  }
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

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

export { showError, hideError, checkInputValidity, setEventListener, enableValidation, hasInvalidInput, toggleButtonState, formSubmitHandler, formSubmitPlaceHandler }; 


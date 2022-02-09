import { SAVING_STATUS, SAVE_STATUS } from '../utils/constants.js';

export default class FormValidator {
  constructor({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
    this._formElement = document.querySelector(formSelector);
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._btnElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  setSavingStatus() {
    this._btnElement.textContent = SAVING_STATUS;
  }

  setSaveStatus() {
    this._btnElement.textContent = SAVE_STATUS;
  }
  
  disableBtnElement() {
    this._btnElement.disabled = true;
    this._btnElement.classList.add(this._inactiveButtonClass);
  }

  // Показать ошибку

  _showError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Скрыть ошибку

  _hideError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  // Проверка формы на корректность
  // введенных данных

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage)
    } else {
      this._hideError(inputElement);
    }
  }

  _setEventListener () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._toggleButtonState(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    })
  }

  enableFormValidation () {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
  }

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return (!inputElement.validity.valid);
    })
  }

  _toggleButtonState (inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._btnElement.classList.add(this._inactiveButtonClass);
      this._btnElement.disabled = true;
    } else {
      this._btnElement.classList.remove(this._inactiveButtonClass);
      this._btnElement.disabled = false;
    }
  }

  clearInputsError() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
        this._hideError(inputElement);
    }) 
  }
}

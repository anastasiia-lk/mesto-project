import { savingStatus, saveStatus } from '../utils/constants.js';

export default class FormValidator {
  constructor({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
    this.formElement = document.querySelector(formSelector);
    this.inputSelector = inputSelector;
    this.submitButtonSelector = submitButtonSelector;
    this.inactiveButtonClass = inactiveButtonClass;
    this.inputErrorClass = inputErrorClass;
    this.errorClass = errorClass;
    this.btnElement = this.formElement.querySelector(submitButtonSelector);
  }

  setSavingStatus() {
    this.btnElement.textContent = savingStatus;
  }

  setSaveStatus() {
    this.btnElement.textContent = saveStatus;
  }
  
  disableBtnElement() {
    this.btnElement.disabled = true;
    this.btnElement.classList.add(this.inactiveButtonClass);
  }

  // Показать ошибку

  showError (inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }

  // Скрыть ошибку

  hideError (inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = "";
  }

  // Проверка формы на корректность
  // введенных данных

  checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this.showError(inputElement, inputElement.validationMessage)
    } else {
      this.hideError(inputElement);
    }
  }

  setEventListener () {
    const inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    this.toggleButtonState(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState(inputList);
      });
    })
  }

  enableFormValidation () {
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this.setEventListener();
  }

  hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return (!inputElement.validity.valid);
    })
  }

  toggleButtonState (inputList) {
    if (this.hasInvalidInput(inputList)) {
      this.btnElement.classList.add(this.inactiveButtonClass);
      this.btnElement.disabled = true;
    } else {
      this.btnElement.classList.remove(this.inactiveButtonClass);
      this.btnElement.disabled = false;
    }
  }
}

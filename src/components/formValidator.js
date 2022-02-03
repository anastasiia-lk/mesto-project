import { savingStatus, saveStatus } from '../utils/constants.js';

export default class FormValidator {
  constructor(selector) {
    this.formElement = document.querySelector(selector);
    this.btnElement = this.formElement.querySelector('.form__button-submit');
  }

  setSavingStatus() {
    this.btnElement.textContent = savingStatus;
  }

  setSaveStatus() {
    this.btnElement.textContent = saveStatus;
  }
  
  disableBtnElement() {
    this.btnElement.disabled = true;
    this.btnElement.classList.add('form__button-submit_inactive');
  }
}
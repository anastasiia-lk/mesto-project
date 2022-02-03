import Popup from './popup.js';
export default class PopupWithForm extends Popup {
  constructor(selector, { handleFormSubmit })  {
    super(selector);
    this.handleFormSubmit = handleFormSubmit;
    this.formElement = this._element.querySelector('.form');
    this._inputArray = this.formElement.querySelectorAll('.form__item');
  }

  setEventListeners() {
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this.handleFormSubmit(this._inputValues)
    });

    // super.setEventListener();
  }

  clearInput() {
    this._inputArray.forEach((input) => {
      input.value='';
    })
    // this.inputElement.value = ''; 
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputArray.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })
    // this.inputElement = this._element.querySelector('#avatar-link');
    // this.inputValue = this.inputElement.value;
  }

}
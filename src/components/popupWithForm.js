import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, popupOpenedSelector, btnCloseSelector }, {
    formSelector, formInputSelector }, { handleFormSubmit })  {
    super({ popupSelector, popupOpenedSelector, btnCloseSelector });
    this._element = document.querySelector(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.formSelector = formSelector;
    this.formInputSelector = formInputSelector;
    this.formElement = this._element.querySelector(this.formSelector);
    this._inputArray = this.formElement.querySelectorAll(this.formInputSelector);
  }

  setEventListeners() {
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this.handleFormSubmit(this._inputValues)
    });

    super.setEventListeners();
  }

  clearInput() {
    this._inputArray.forEach((input) => {
      input.value='';
    })
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputArray.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })
  }

  setInputValue(inputName, inputValue) {
    this.formElement.elements[inputName].value = inputValue;
  }
}

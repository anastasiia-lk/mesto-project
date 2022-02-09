import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, popupOpenedSelector, btnCloseSelector }, {
    formSelector, formInputSelector }, { handleFormSubmit })  {
    super({ popupSelector, popupOpenedSelector, btnCloseSelector });
    this._element = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = formSelector;
    this._formInputSelector = formInputSelector;
    this._formElement = this._element.querySelector(this._formSelector);
    this._inputArray = this._formElement.querySelectorAll(this._formInputSelector);
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._handleFormSubmit(this._inputValues)
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
    this._formElement.elements[inputName].value = inputValue;
  }
}

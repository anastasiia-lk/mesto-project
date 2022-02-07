import Popup from './Popup.js';
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

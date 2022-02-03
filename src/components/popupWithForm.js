import Popup from './popup.js';
export default class PopupWithForm extends Popup {
  constructor(selector, { handleFormSubmit })  {
    super(selector);
    this.handleFormSubmit = handleFormSubmit;
    this.formElement = this._element.querySelector('.form');
  }

  setEventListeners() {
    // super.setEventListener();

    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this.handleFormSubmit(this.inputValue)
    });
  }

  clearInput() {
    this.inputElement.value = ''; 
  }

  _getInputValues() {
    this.inputElement = this._element.querySelector('#avatar-link');
    this.inputValue = this.inputElement.value;
  }

}
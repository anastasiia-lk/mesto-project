import { ESC_KEY_CODE } from '../utils/constants.js';

export default class Popup {
  constructor({ popupSelector, popupOpenedSelector, btnCloseSelector }) {
    this.popupSelector = popupSelector;
    this.popupOpenedSelector = popupOpenedSelector;
    this.btnCloseSelector = btnCloseSelector;
    this._element = document.querySelector(this.popupSelector);
  }

  setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(this.popupOpenedSelector) || evt.target.classList.contains(this.btnCloseSelector)){
        this.close();
      }
    })
  }

  open() {
    this._element.classList.add(this.popupOpenedSelector);
    document.addEventListener('keydown', this._handleEscClose);
  }
  
  close() {
    this._element.classList.remove(this.popupOpenedSelector);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.code === ESC_KEY_CODE) {
      this.close();
    }  
  }
}

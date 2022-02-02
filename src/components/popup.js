export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
  }

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }
  
  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.code === 'Escape') {
      this.close();
    }  
  }

  setEventListeners() {
    this._element.addEventListener ('click', () => {
      this._btnClose = this._element.querySelector('popup__button-close');
      if (this._element.classList.contains('popup_opened') || this._btnClose.classList.contains('popup__button-close')){
        this.close();
      }
    })
  }
}
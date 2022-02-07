import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }
  
  open(imageLink, imageName) {
    this._image = this._element.querySelector('.view-image__item');
    this._caption = this._element.querySelector('.view-image__caption');

    this._image.setAttribute('src', imageLink);
    this._image.setAttribute('alt', imageName);
    this._caption.textContent = imageName;

    this._element.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }
}

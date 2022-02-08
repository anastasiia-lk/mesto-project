import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor({ popupSelector, popupOpenedSelector, btnCloseSelector }, {
    imgSelector, nameSelector
  }) {
    super({ popupSelector, popupOpenedSelector, btnCloseSelector }, { imgSelector, nameSelector });
    this._element = document.querySelector(popupSelector);
    this.imgSelector = imgSelector;
    this.nameSelector = nameSelector;
  }
  
  open(imageLink, imageName) {
    this._image = this._element.querySelector(this.imgSelector);
    this._caption = this._element.querySelector(this.nameSelector);

    this._image.setAttribute('src', imageLink);
    this._image.setAttribute('alt', imageName);
    this._caption.textContent = imageName;

    this._element.classList.add(this.popupOpenedSelector);
    document.addEventListener('keydown', this._handleEscClose);
  }
}

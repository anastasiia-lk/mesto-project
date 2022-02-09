import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor({ popupSelector, popupOpenedSelector, btnCloseSelector }, {
    imgSelector, nameSelector
  }) {
    super({ popupSelector, popupOpenedSelector, btnCloseSelector }, { imgSelector, nameSelector });
    this._imgSelector = imgSelector;
    this._nameSelector = nameSelector;
    this._image = this._element.querySelector(this._imgSelector);
    this._caption = this._element.querySelector(this._nameSelector);
  }
  
  open(imageLink, imageName) {
    this._image.setAttribute('src', imageLink);
    this._image.setAttribute('alt', imageName);
    this._caption.textContent = imageName;

    super.open();
  }
}

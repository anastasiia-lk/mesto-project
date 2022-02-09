export default class Card {
  constructor(data, { cardTemplateSelector, likeCaptionSelector, likeBtnSelector, likeBtnActiveSelector, trashBtnSelector, trashBtnCreatedSelector, imgSelector, nameSelector, cardSelector}, { setLike, removeLike, removeCard, openImagePopup }, userId) {
    this._likes = data.likes;
    this._cardId = data._id;
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._cardTemplateSelector = cardTemplateSelector;
    this._likeCaptionSelector = likeCaptionSelector;
    this._likeBtnSelector = likeBtnSelector;
    this._likeBtnActiveSelector = likeBtnActiveSelector;
    this._trashBtnSelector = trashBtnSelector;
    this._trashBtnCreatedSelector = trashBtnCreatedSelector;
    this._imgSelector = imgSelector;
    this._nameSelector = nameSelector;
    this._cardSelector = cardSelector;

    this._userId = userId;

    this._setLike = setLike;
    this._removeLike = removeLike;

    this._removeCard = removeCard;

    this._openImagePopup = openImagePopup;
  }

  _checkUserLike(likesArr) {
    return likesArr.some(el => el._id === this._userId);
  }

  printLikes(count) {
    this._likesCounter.textContent = count;  
  }

  calcLikes(likesArray) {
    if (this._checkUserLike(likesArray)) {
      this._likeBtn.classList.add(this._likeBtnActiveSelector);
    } else {
      this._likeBtn.classList.remove(this._likeBtnActiveSelector);
    }

    this._likesCounter.textContent = likesArray.length;

    this._likes = likesArray;
  }

  _toggleLike() {
    if (this._checkUserLike(this._likes)) {
      this._removeLike(this._cardId)
    } else {
      this._setLike(this._cardId);
    }
  }

  _showTrashBtn() {
    if (this._owner._id === this._userId) {
      this._trashBtn.classList.add(this._trashBtnCreatedSelector);
    }
  }

  _handleCard() {
    this._removeCard(this._cardId);
  }

  eraseCard() {
    this._element.remove();
  }

  _getElement() {

    const cardElement = document
    .querySelector(this._cardTemplateSelector)
    .content
    .querySelector(this._cardSelector)
    .cloneNode(true);

    return cardElement;
  }
  
  generate() {
    this._element = this._getElement();
    this._setEventListeners();
    this.calcLikes(this._likes);
    this.printLikes(this._likes.length);

    this._element.querySelector(this._imgSelector).setAttribute('src', this._link);
    this._element.querySelector(this._imgSelector).setAttribute('alt', this._name);
    this._element.querySelector(this._nameSelector).textContent = this._name;

    this._showTrashBtn();
    
    return this._element;
  }

  _setEventListeners() {
    this._likeBtn = this._element.querySelector(this._likeBtnSelector);
    this._likesCounter = this._element.querySelector(this._likeCaptionSelector);
    this._trashBtn = this._element.querySelector(this._trashBtnSelector);
    this._viewImage = this._element.querySelector(this._imgSelector);

    this._likeBtn.addEventListener('click', () => {
      this._toggleLike();
    })

    this._trashBtn.addEventListener('click', () => {
      this._handleCard();
    })

    this._viewImage.addEventListener('click', () => {
      this._openImagePopup();
    })
  }
}

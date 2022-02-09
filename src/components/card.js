export default class Card {
  constructor(data, { cardTemplateSelector, likeCaptionSelector, likeBtnSelector, likeBtnActiveSelector, trashBtnSelector, trashBtnCreatedSelector, imgSelector, nameSelector, cardSelector}, { setLike, removeLike, removeCard, openImagePopup }, userId) {
    this.likes = data.likes;
    this.cardId = data._id;
    this.name = data.name;
    this.link = data.link;
    this.owner = data.owner;
    this._cardTemplateSelector = cardTemplateSelector;
    this._likeCaptionSelector = likeCaptionSelector;
    this._likeBtnSelector = likeBtnSelector;
    this._likeBtnActiveSelector = likeBtnActiveSelector;
    this._trashBtnSelector = trashBtnSelector;
    this._trashBtnCreatedSelector = trashBtnCreatedSelector;
    this._imgSelector = imgSelector;
    this._nameSelector = nameSelector;
    this._cardSelector = cardSelector;

    this.userId = userId;

    this._setLike = setLike;
    this._removeLike = removeLike;

    this._removeCard = removeCard;

    this.openImagePopup = openImagePopup;
  }

  _checkUserLike(likesArr) {
    return likesArr.some(el => el._id === this.userId);
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

    this._element.querySelector(this._likeCaptionSelector).textContent = likesArray.length;

    this.likes = likesArray;
  }

  toggleLike() {
    if (this._checkUserLike(this.likes)) {
      this._removeLike(this.cardId)
    } else {
      this._setLike(this.cardId);
    }
  }

  showTrashBtn() {
    if (this.owner._id === this.userId) {
      this._trashBtn.classList.add(this._trashBtnCreatedSelector);
    }
  }

  handleCard() {
    this._removeCard(this.cardId);
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
    this.calcLikes(this.likes);
    this.printLikes(this.likes.length);

    this._element.querySelector(this._imgSelector).setAttribute('src', this.link);
    this._element.querySelector(this._imgSelector).setAttribute('alt', this.name);
    this._element.querySelector(this._nameSelector).textContent = this.name;

    this.showTrashBtn();
    
    return this._element;
  }

  _setEventListeners() {
    this._likeBtn = this._element.querySelector(this._likeBtnSelector);
    this._likesCounter = this._element.querySelector(this._likeCaptionSelector);
    this._trashBtn = this._element.querySelector(this._trashBtnSelector);
    this._viewImage = this._element.querySelector(this._imgSelector);

    this._likeBtn.addEventListener('click', () => {
      this.toggleLike();
    })

    this._trashBtn.addEventListener('click', () => {
      this.handleCard();
    })

    this._viewImage.addEventListener('click', () => {
      this.openImagePopup();
    })
  }
}

export default class Card {
  constructor(data, selector, { setLike, removeLike, removeCard, openImagePopup }, userId) {
    this.likes = data.likes;
    this.cardId = data._id;
    this.name = data.name;
    this.link = data.link;
    this.owner = data.owner;
    this._selector = selector;
    
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
    this._likesCounter = this._element.querySelector('.like-block__caption');
    this._likesCounter.textContent = count;  
  }

  calcLikes(likesArray) {
    if (this._checkUserLike(likesArray)) {
      this._likeBtn.classList.add('active');
    } else {
      this._likeBtn.classList.remove('active');
    }

    this._element.querySelector('.like-block__caption').textContent = likesArray.length;

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
      this._trashBtn.classList.add('card__button-trash_created');
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
    .querySelector(this._selector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }
  
  generate() {
    this._element = this._getElement();
    this._setEventListeners();
    this.calcLikes(this.likes);
    this.printLikes(this.likes.length);

    this._element.querySelector('.card__image').setAttribute('src', this.link);
    this._element.querySelector('.card__image').setAttribute('alt', this.name);
    this._element.querySelector('.card__caption-name').textContent = this.name;

    this.showTrashBtn();
    
    return this._element;
  }

  _setEventListeners() {
    this._likeBtn = this._element.querySelector('.card__button-like');
    this._trashBtn = this._element.querySelector('.card__button-trash');
    this._viewImage = this._element.querySelector('.card__image');

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

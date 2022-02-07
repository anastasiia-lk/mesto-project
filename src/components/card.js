import { openPopup, showPopupImage } from './modal.js'; 

const elements = document.querySelector('.elements'); 
const imagePopupContainer = document.querySelector('.popup__container_type_image'); 
const imagePopup = imagePopupContainer.closest('.popup');

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

//создать карточку

function newPlace(item, userId) {

  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.card').cloneNode(true);
  
  const newViewImage = placeElement.querySelector('.card__image');
  const trashBtn = placeElement.querySelector('.card__button-trash');
  const likeBtn = placeElement.querySelector('.card__button-like');
  const likesCounter = placeElement.querySelector('.like-block__caption');

  const userLike = item.likes.some(function (el) { return el._id === userId; });
  
  newViewImage.setAttribute('src', item.link);
  newViewImage.setAttribute('alt', item.name);
  placeElement.querySelector('.card__caption-name').textContent =item.name;
  
  if (item.owner._id === userId) {
    trashBtn.classList.add('card__button-trash_created');
  }

  if (userLike) {
    likeBtn.classList.add('active')  
  }

  likesCounter.textContent = item.likes.length;

//   placeElement.querySelector('.card__button-like').addEventListener('click', function (evt) {
//   const eventTarget = evt.target;
//   if (eventTarget.getAttribute('class') === "card__button-like") {
//     addLike (item._id)
//       .then((result)=>{
//         likesCounter.textContent = result.likes.length;
//         eventTarget.classList.add('active')
//       })
//       .catch((err) => {
//         console.log(err)
//       }); 
//   } else {
//     deleteLike (item._id)
//       .then((result)=>{
//         likesCounter.textContent = result.likes.length;
//         eventTarget.classList.remove('active')
//       })
//       .catch((err) => {
//         console.log(err)
//       }); 
//   }
// });

// placeElement.querySelector('.card__button-trash').addEventListener('click', function (evt) {
//   const eventTarget = evt.target;
//   const targetCard = eventTarget.closest('.card');
//   deleteCard(item._id)
//     .then(res => {
//       targetCard.remove();
//     })
//     .catch((err) => {
//       console.log(err)
//     }); 
// });

// newViewImage.addEventListener('click', function (evt) {
//   openPopup(imagePopup);
//   showPopupImage(item.link, item.name);
// });

  // elements.prepend(placeElement); 
  return placeElement;
}

//добавить карточку
function addPlace(element){
  elements.prepend(element); 
}

export { newPlace, addPlace }

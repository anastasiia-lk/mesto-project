import { openPopup, showPopupImage } from './modal.js'; 
import { deleteCard, addLike, deleteLike } from './api.js';

const elements = document.querySelector('.elements'); 
const imagePopupContainer = document.querySelector('.popup__container_type_image'); 
const imagePopup = imagePopupContainer.closest('.popup');

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

  placeElement.querySelector('.card__button-like').addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  if (eventTarget.getAttribute('class') === "card__button-like") {
    addLike (item._id)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((result)=>{
        likesCounter.textContent = result.likes.length;
        eventTarget.classList.add('active')
      })
  } else {
    deleteLike (item._id)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((result)=>{
        likesCounter.textContent = result.likes.length;
        eventTarget.classList.remove('active')
      })
  }
});

placeElement.querySelector('.card__button-trash').addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  const targetCard = eventTarget.closest('.card');
  targetCard.remove();
  deleteCard(item._id);
});

newViewImage.addEventListener('click', function (evt) {
  openPopup(imagePopup);
  showPopupImage(item.link, item.name);
});

  // elements.prepend(placeElement); 
  return placeElement;
}

//добавить карточку
function addPlace(element){
  elements.prepend(element); 
}

export { newPlace, addPlace }

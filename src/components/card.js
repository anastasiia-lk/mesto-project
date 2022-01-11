import { openPopup, showPopupImage } from './modal.js'; 

const elements = document.querySelector('.elements'); 
const imagePopupContainer = document.querySelector('.popup__container_type_image'); 
const imagePopup = imagePopupContainer.closest('.popup');

// удалить карточку

function deleteCard (id) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-5/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be',
    },
  })
}

//создать карточку
function newPlace(item, userId) {

  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.card').cloneNode(true);
  
  const newViewImage = placeElement.querySelector('.card__image');
  const trashBtn = placeElement.querySelector('.card__button-trash');
  const likesCounter = placeElement.querySelector('.like-block__caption');
  
  newViewImage.setAttribute('src', item.link);
  newViewImage.setAttribute('alt', item.name);
  placeElement.querySelector('.card__caption-name').textContent =item.name;
  if (item.owner._id === userId) {
    trashBtn.classList.add('card__button-trash_created');
  }
  likesCounter.textContent = item.likes.length;
  placeElement.querySelector('.card__button-like').addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('active');
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

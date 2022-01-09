import { openPopup, showPopupImage } from './modal.js'; 

const elements = document.querySelector('.elements'); 
const imagePopupContainer = document.querySelector('.popup__container_type_image'); 
const imagePopup = imagePopupContainer.closest('.popup');

//создать карточку
function newPlace(placeValue, imageLinkValue) {

  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.card').cloneNode(true);
  
  const newViewImage = placeElement.querySelector('.card__image');
  newViewImage.setAttribute('src', imageLinkValue);
  newViewImage.setAttribute('alt', placeValue);
  placeElement.querySelector('.card__caption-name').textContent = placeValue;

  placeElement.querySelector('.card__button-like').addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('active');
});

placeElement.querySelector('.card__button-trash').addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  const deleteCard = eventTarget.closest('.card');
  deleteCard.remove();
});

newViewImage.addEventListener('click', function (evt) {
  openPopup(imagePopup);
  showPopupImage(imageLinkValue, placeValue);
});

  // elements.prepend(placeElement); 
  return placeElement;
}

//добавить карточку
function addPlace(element){
  elements.prepend(element); 
}

export { newPlace, addPlace }

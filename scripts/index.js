const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

  for (let i = 0; i < cardImages.length; i++) {
    let likeButtons = document.querySelectorAll('.card__button-like');
    let cardCaptionNames = document.querySelectorAll('.card__caption-name');
    cardImages[i].setAttribute('src', initialCards[i].link);
    cardImages[i].setAttribute('alt', initialCards[i].name);
    cardCaptionNames[i].textContent = initialCards[i].name;
    likeButtons[i].addEventListener("click", function() {
      likeButtons[i].classList.toggle('active')
    });
  }




let profile = document.querySelector('.profile');
let elements = document.querySelector('.elements');
let popup = document.querySelector('.popup');
let popupPlace = document.querySelector('.popup.new-place');
/*find button-add, popup new-place, button-close new-place*/
let addButton = profile.querySelector('.profile__button-add');
let popupContainerPlace = popupPlace.querySelector('.popup__container.new-place');
let closeButtonPlace = popupPlace.querySelector('.popup__button-close.new-place');
/*find button-edit, popup, button-close*/
let editButton = profile.querySelector('.profile__button-edit');
let popupContainer = popup.querySelector('.popup__container');
let closeButton = popup.querySelector('.popup__button-close');
/*find button-like*/
// let likeButtons = document.querySelectorAll('.card__button-like');
/*get/change popup-name*/
let profileTitle = profile.querySelector('.profile-edit__title');
let person = popup.querySelector('#person');
person.value = profileTitle.textContent; 
/*get/change popup-profession*/
let profileSubtitle = profile.querySelector('.profile-edit__subtitle');
let profession = popup.querySelector('#profession');
profession.value = profileSubtitle.textContent;
/*find button-submit*/
let submitButton = popup.querySelector('.form__button-submit');
/*find card-image*/
let cardCaptionNames = elements.querySelectorAll('.card__caption-name');
/*find button-submit new-place*/
let submitButtonPlace = popupPlace.querySelector('.form__button-submit.new-place');

/*form-submit*/

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = person.value;
  profileSubtitle.textContent = profession.value;
  popup.classList.toggle('popup_opened');
  popupContainer.classList.toggle('popup_opened');
}
popup.addEventListener('submit', formSubmitHandler);

/*insert card*/

function formPlaceSubmitHandler (evt) {
  evt.preventDefault();
  // profileTitle.textContent = person.value;
  // profileSubtitle.textContent = profession.value;
  // popup.classList.toggle('popup_opened');
  // popupContainer.classList.toggle('popup_opened');
  elements.insertAdjacentHTML('afterbegin', '<article class="card"><img class="card__image" alt="Карачаевск" src="images/karachaevsk.png" /><button class="card__button-trash" type="button"></button><div class="card__caption"><h2 class="card__caption-name"></h2><button class="card__button-like" type="button"></button></div></article>');
  let cardAddedImages = elements.querySelectorAll('.card__image'); 
  let cardAddedCaptions = elements.querySelectorAll('.card__caption-name');
  let cardLikeButton = elements.querySelectorAll('.card__button-like');
  let place = popupPlace.querySelector('#place');
  let imageLink = popupPlace.querySelector('#image-link');
  cardAddedImages[0].setAttribute('src', imageLink.value);
  cardAddedImages[0].setAttribute('alt', place.value);
  cardAddedCaptions[0].textContent = place.value;
  // cardCaptionNames[i].textContent = initialCards[i].name;
  // console.log(cardAddedCaptions);
    cardLikeButton[0].addEventListener("click", function() {
      cardLikeButton[0].classList.toggle('active')
    });
  popupPlace.classList.toggle('popup_opened');
  popupContainerPlace.classList.toggle('popup_opened');
}

popup.addEventListener('submit', formPlaceSubmitHandler);


/*button-like click*/
// likeButtons = document.querySelectorAll('.card__button-like');
// for (let i = 0; i < likeButtons.length; i++) {
//   likeButtons[i].addEventListener("click", function() {
//     likeButtons[i].classList.toggle('active')
//     // if (this.classList.contains('active')) {
//     //   this.classList.remove('active');
//     // }
//     // else this.classList.add('active');
//   });
// }
/*button-edit click*/
// function openPopup (){
//   popup.classList.add('popup_opened');
//   popupContainer.classList.add('popup_opened');
// }
/*button-close click*/
// function closePopup (){
//   popup.classList.remove('popup_opened');
//   popupContainer.classList.remove('popup_opened');
// }

/*button-edit&close click*/
function togglePopup (){
  popup.classList.toggle('popup_opened');
  popupContainer.classList.toggle('popup_opened');
}

/*button-add click*/
// function openPopupPlace (){
//   popupPlace.classList.add('popup_opened');
//   popupContainerPlace.classList.add('popup_opened');
// }
/*button-close-place click*/
// function closePopupPlace (){
//   popupPlace.classList.remove('popup_opened');
//   popupContainerPlace.classList.remove('popup_opened');
// }

/*button-add&close click*/
function togglePopupPlace (){
  popupPlace.classList.toggle('popup_opened');
  popupContainerPlace.classList.toggle('popup_opened');
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

submitButton.addEventListener('click', formSubmitHandler);
// submitButtonPlace.addEventListener('click', formPlaceSubmitHandler);
addButton.addEventListener('click', togglePopupPlace);
closeButtonPlace.addEventListener('click', togglePopupPlace);

//add new place
function addPlace(placeValue, imageLinkValue) {

  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.card').cloneNode(true);

  placeElement.querySelector('.card__image').setAttribute('src', imageLinkValue);
  placeElement.querySelector('.card__image').setAttribute('alt', placeValue);
  placeElement.querySelector('.card__caption-name').textContent = placeValue;

  placeElement.querySelector('.card__button-like').addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('active');
});

  elements.prepend(placeElement); 
}

function togglePopupPlace (){
  popupPlace.classList.toggle('popup_opened');
  popupContainerPlace.classList.toggle('popup_opened');
}

submitButtonPlace.addEventListener('click', function(){
  const place = document.querySelector('#place');
  const imageLink = document.querySelector('#image-link');

  addPlace(place.value, imageLink.value);
  togglePopupPlace();

  place.value = '';
  imageLink.value = '';
});


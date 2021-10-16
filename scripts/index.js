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
//инициализация страницы
let elements = document.querySelector('.elements');
let closeButtons = document.querySelectorAll('.popup__button-close');
initialCards.forEach(function(item){
  addPlace(item.name, item.link);
})

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

placeElement.querySelector('.card__button-trash').addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  const deleteCard = eventTarget.closest('.card');
  deleteCard.remove();
});

placeElement.querySelector('.card__image').addEventListener('click', function (evt) {
  document.querySelector('.popup.image').classList.toggle('popup_opened');
  document.querySelector('.popup__container.type-image').classList.toggle('popup_opened');
});

  elements.prepend(placeElement); 
}

//нажимаем кнопку редактировать профиль
let editButton = document.querySelector('.profile__button-edit');
let editPopup = document.querySelector('.popup__container_type_edit');

function togglePopup(item){
  item.classList.toggle('popup_opened');
  const closestPopup = item.closest('.popup')
  closestPopup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', function(event){
  togglePopup(editPopup)
});

//нажимаем кнопку добавить место
let addButton = document.querySelector('.profile__button-add');
let addPopup = document.querySelector('.popup__container_type_add');

addButton.addEventListener('click', function(event){
  togglePopup(addPopup)
});






// let profile = document.querySelector('.profile');
// let elements = document.querySelector('.elements');

// let popup = document.querySelector('.popup');
// let closeButton = document.querySelector('.popup__button-close');

// let popupPlace = document.querySelector('.popup.new-place');
/*find button-add, popup new-place, button-close new-place*/
// let editButton = profile.querySelector('.profile__button-edit');
// let addButton = profile.querySelector('.profile__button-add');

// let popupContainer = popup.querySelector('.popup__container');

// let popupContainerPlace = popupPlace.querySelector('.popup__container.new-place');
// let closeButtonPlace = document.querySelector('.popup__button-close.new-place');
// let closeButtonImage = document.querySelector('.popup__button-close.image');
/*find button-edit, popup, button-close*/
/*find button-like*/
// let likeButtons = document.querySelectorAll('.card__button-like');
/*get/change popup-name*/
// let profileTitle = profile.querySelector('.profile-edit__title');
// let person = popup.querySelector('#person');
// person.value = profileTitle.textContent; 
/*get/change popup-profession*/
// let profileSubtitle = profile.querySelector('.profile-edit__subtitle');
// let profession = popup.querySelector('#profession');
// profession.value = profileSubtitle.textContent;
/*find button-submit*/
// let submitButton = popup.querySelector('.form__button-submit');
/*find card-image*/
// let cardCaptionNames = elements.querySelectorAll('.card__caption-name');
/*find button-submit new-place*/
// let submitButtonPlace = popupPlace.querySelector('.form__button-submit.new-place');

/*form-submit*/

// function formSubmitHandler (evt) {
//   evt.preventDefault();
//   profileTitle.textContent = person.value;
//   profileSubtitle.textContent = profession.value;
//   popup.classList.toggle('popup_opened');
//   popupContainer.classList.toggle('popup_opened');
// }
// popup.addEventListener('submit', formSubmitHandler);

/*insert card*/

// function formPlaceSubmitHandler (evt) {
//   evt.preventDefault();
//   elements.insertAdjacentHTML('afterbegin', '<article class="card"><img class="card__image" alt="Карачаевск" src="images/karachaevsk.png" /><button class="card__button-trash" type="button"></button><div class="card__caption"><h2 class="card__caption-name"></h2><button class="card__button-like" type="button"></button></div></article>');
//   let cardAddedImages = elements.querySelectorAll('.card__image'); 
//   let cardAddedCaptions = elements.querySelectorAll('.card__caption-name');
//   let cardLikeButton = elements.querySelectorAll('.card__button-like');
//   let place = popupPlace.querySelector('#place');
//   let imageLink = popupPlace.querySelector('#image-link');
//   cardAddedImages[0].setAttribute('src', imageLink.value);
//   cardAddedImages[0].setAttribute('alt', place.value);
//   cardAddedCaptions[0].textContent = place.value;
//     cardLikeButton[0].addEventListener("click", function() {
//       cardLikeButton[0].classList.toggle('active')
//     });
//   popupPlace.classList.toggle('popup_opened');
//   popupContainerPlace.classList.toggle('popup_opened');
// }

// popup.addEventListener('submit', formPlaceSubmitHandler);


/*button-edit&close click*/
// function togglePopup (){
//   popup.classList.toggle('popup_opened');
//   popupContainer.classList.toggle('popup_opened');
// }



/*button-add&close click*/
// function togglePopupPlace (){
//   popupPlace.classList.toggle('popup_opened');
//   popupContainerPlace.classList.toggle('popup_opened');
// }

// editButton.addEventListener('click', togglePopup());
// closeButton.addEventListener('click', togglePopup);

// submitButton.addEventListener('click', formSubmitHandler);
// submitButtonPlace.addEventListener('click', formPlaceSubmitHandler);
// addButton.addEventListener('click', togglePopupPlace);
// closeButtonPlace.addEventListener('click', togglePopupPlace);


// function togglePopupBlock (){
//   const eventTarget = evt.target;
//   const togglePopup = eventTarget.closest('.popup');
//   const togglePopupContainer = eventTarget.closest('.popup__container');
//   togglePopup.classList.toggle('popup_opened');
//   togglePopupContainer.classList.toggle('popup_opened');
// }

// submitButtonPlace.addEventListener('click', function(){
//   const place = document.querySelector('#place');
//   const imageLink = document.querySelector('#image-link');

//   addPlace(place.value, imageLink.value);
//   togglePopupBlock();

//   place.value = '';
//   imageLink.value = '';
// });

//init places
// initialCards.forEach(function(item){
//   addPlace(item.name, item.link);
// })

// closeButtonImage.addEventListener('click', togglePopupBlock(evt));
// closeButton.addEventListener('click', togglePopupBlock());


//слушаем все кнопки закрыть
// closeButtons.addEventListener('click', function (evt) {
//   const eventTarget = evt.target;
//   const togglePopup = eventTarget.closest('.popup');
//   const togglePopupContainer = eventTarget.closest('.popup__container');
//   togglePopup.classList.toggle('popup_opened');
//   togglePopupContainer.classList.toggle('popup_opened');
// });




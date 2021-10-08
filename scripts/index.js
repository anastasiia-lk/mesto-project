let profile = document.querySelector('.profile');
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
let likeButtons = document.querySelectorAll('.card__button-like');

/*button-like click*/
for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener("click", function() {
    likeButtons[i].classList.toggle('active')
    // if (this.classList.contains('active')) {
    //   this.classList.remove('active');
    // }
    // else this.classList.add('active');
  });
}
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
  popup.classList.toggle('popup_opened');
  popupContainer.classList.toggle('popup_opened');
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
addButton.addEventListener('click', togglePopupPlace);
closeButtonPlace.addEventListener('click', togglePopupPlace);
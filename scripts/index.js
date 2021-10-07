let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');
let editButton = profile.querySelector('.profile__button-edit');
let closeButton = popup.querySelector('.popup__button-close');
let likeButtons = document.querySelectorAll('.card__button-like');
for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener("click", function() {
    likeButtons[i].classList.toggle('active')
    // if (this.classList.contains('active')) {
    //   this.classList.remove('active');
    // }
    // else this.classList.add('active');
  });
}
function openPopup (){
  popup.classList.add('popup_opened');
  popupContainer.classList.add('popup_opened');
}
function closePopup (){
  popup.classList.remove('popup_opened');
  popupContainer.classList.remove('popup_opened');
}
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
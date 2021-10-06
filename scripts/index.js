let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');
let editButton = profile.querySelector('.profile__button-edit');
let closeButton = popup.querySelector('.popup__button-close');
function openPopup (){
  popup.classList.add('open');
  popupContainer.classList.add('open');
}
function closePopup (){
  popup.classList.remove('open');
  popupContainer.classList.remove('open');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
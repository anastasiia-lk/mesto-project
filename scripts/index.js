let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let editButton = profile.querySelector('.profile__button-edit');
let closeButton = popup.querySelector('.popup__button-close');
function openPopup (){
  popup.classList.add('popup_opened');
}
function closePopup (){
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
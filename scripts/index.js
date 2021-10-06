let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let editButton = profile.querySelector('.profile__button-edit');
let closeButton = popup.querySelector('.popup__button-close');
function openPopup (){
  popup.classList.remove('popup_is_closed');
  popup.classList.add('popup_is_opened');
}
function closePopup (){
  popup.classList.remove('popup_is_opened');
  popup.classList.add('popup_is_closed');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
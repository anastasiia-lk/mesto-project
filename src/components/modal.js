const imagePopupContainer = document.querySelector('.popup__container_type_image');
const newImage = imagePopupContainer.querySelector('.view-image__item');
const newImageCaption = imagePopupContainer.querySelector('.view-image__caption');
const popups = document.querySelectorAll('.popup');

//показать картинку в popup

function showPopupImage(imageLinkValue, placeValue){
  newImage.setAttribute('src', imageLinkValue);
  newImage.setAttribute('alt', placeValue);
  newImageCaption.textContent = placeValue;
}

//открыть модальное окно

function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupByEscClick);
}

//закрыть модальное окно

function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupByEscClick);
}

// обработчик для popup
// закрыть popup кликом на оверлей 
// закрыть popup кликом на крестик

function addPopupListener () {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popup) => {
    popup.addEventListener ('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')){
        closePopup(popup);
      }
    })
  })
}

// закрыть popup нажатием клавиши Esc

function closePopupByEscClick (evt) {
  if (evt.code === 'Escape') {
    const popupElementOpen = document.querySelector('.popup_opened');
    closePopup(popupElementOpen);
  }
}

export { showPopupImage, openPopup, closePopup, addPopupListener, closePopupByEscClick }; 
const imagePopupContainer = document.querySelector('.popup__container_type_image');

//показать картинку в popup

function showPopupImage(imageLinkValue, placeValue){
  const newImage = imagePopupContainer.querySelector('.view-image__item');
  newImage.setAttribute('src', imageLinkValue);
  newImage.setAttribute('alt', placeValue);
  // imagePopupContainer.querySelector('.view-image__item').style.backgroundImage = `url('${imageLinkValue}')`;
  imagePopupContainer.querySelector('.view-image__caption').textContent = placeValue;
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

//добавить элементам слушатель открытия модального окна 

function addPopupOpenListener (element){
  element.forEach(function(item){
    item.addEventListener('click', function(event){
      const findPopup = item.closest('.popup');
      openPopup(findPopup);
    })
  })
}

//добавить элементам слушатель закрытия модального окна 

function addPopupCloseListener (element){
  element.forEach(function(item){
    item.addEventListener('click', function(event){
      const findPopup = item.closest('.popup');
      closePopup(findPopup);
    })
  })
}

// закрыть popup кликом на оверлей

function popupValidation () {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popupElement);
      }
    })
  })
}

// закрыть popup нажатием клавиши Esc

function closePopupByEscClick (evt) {
  const popupElementOpen = document.querySelector('.popup_opened');
  if (evt.code === 'Escape') {
    popupElementOpen.classList.remove('popup_opened');
  }
}

export { showPopupImage, openPopup, closePopup, addPopupOpenListener, addPopupCloseListener, popupValidation, closePopupByEscClick }; 
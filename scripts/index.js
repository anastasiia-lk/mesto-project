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

const elements = document.querySelector('.elements');
const imagePopupContainer = document.querySelector('.popup__container_type_image');

//показать картинку в popup
function showPopupImage(imageLinkValue, placeValue){
  const newImage = imagePopupContainer.querySelector('.view-image__item');
  newImage.setAttribute('src', imageLinkValue);
  newImage.setAttribute('alt', placeValue);
  // imagePopupContainer.querySelector('.view-image__item').style.backgroundImage = `url('${imageLinkValue}')`;
  imagePopupContainer.querySelector('.view-image__caption').textContent = placeValue;
}

//открыть-закрыть модальное окно
function togglePopup(item){
  item.classList.toggle('popup_opened');
  const closestPopup = item.closest('.popup');
  closestPopup.classList.toggle('popup_opened');
}

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
  togglePopup(imagePopupContainer);
  showPopupImage(imageLinkValue, placeValue);
});

  // elements.prepend(placeElement); 
  return placeElement;
}

//добавить карточку
function addPlace(element){
  elements.prepend(element); 
}

//инициализация страницы
initialCards.forEach(function(item){
  const card = newPlace(item.name, item.link);
  addPlace(card);
})


//нажимаем кнопку редактировать профиль
const editButton = document.querySelector('.profile__button-edit');
const editPopupContainer = document.querySelector('.popup__container_type_edit');
const nameInput = editPopupContainer.querySelector('#person');
const jobInput = editPopupContainer.querySelector('#profession');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile-edit__title');
const profileJob = profile.querySelector('.profile-edit__subtitle');


editButton.addEventListener('click', function(event){
  togglePopup(editPopupContainer);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

//нажимаем кнопку добавить место
const addButton = document.querySelector('.profile__button-add');
const addPopupContainer = document.querySelector('.popup__container_type_add');

addButton.addEventListener('click', function(event){
  togglePopup(addPopupContainer);
});

//найти контейнер модального окна
function findContainer (item){
  const findPopupContainer = item.closest('.popup__container');
  togglePopup(findPopupContainer);
}

//добавить элементам слушатель открытия-закрытия модального окна 
function addPopupToggleListener (element){
  element.forEach(function(item){
    item.addEventListener('click', function(event){
      findContainer(item);
    })
  })
}

//нажимаем кнопку закрыть
const closeButtons = document.querySelectorAll('.popup__button-close');
addPopupToggleListener(closeButtons);

//нажимаем кнопку сохранить
const submitButtons = document.querySelectorAll('.form__button-submit');
addPopupToggleListener(submitButtons);

//редактирование информации в профиле

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

const formElement = editPopupContainer.querySelector('.form');
const submitProfileButton = editPopupContainer.querySelector('.form__button-submit');
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

//добавляем новое место

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

const formPlaceElement = addPopupContainer.querySelector('.form');
 submitPlaceButton = addPopupContainer.querySelector('.form__button-submit');
function formSubmitPlaceHandler (evt) {
  evt.preventDefault();
  const placeInput = addPopupContainer.querySelector('#place').value;
  const imageLinkInput = addPopupContainer.querySelector('#image-link').value;
  const card = newPlace(placeInput, imageLinkInput);
  addPlace(card);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPlaceElement.addEventListener('submit', formSubmitPlaceHandler);
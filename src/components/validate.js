const editPopupContainer = document.querySelector('.popup__container_type_edit');

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

// Обработчик ошибок при заполнении
// полей формы

// Показать ошибку

function showError (formElement, inputElement, errorMessage, validationObject) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationObject.errorClass);
}

// Скрыть ошибку

function hideError (formElement, inputElement, validationObject) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationObject.inputErrorClass);
  errorElement.classList.remove(validationObject.errorClass);
  errorElement.textContent = "";
}

// Проверка формы на корректность
// введенных данных

function checkInputValidity (formElement, inputElement, validationObject) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, validationObject)
  } else {
    hideError(formElement, inputElement, validationObject);
  }
}

function setEventListener (formElement, validationObject) {
  const inputList = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
  const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationObject);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationObject);
      toggleButtonState(inputList, buttonElement, validationObject);
    });
  })
}

function enableFormValidation (validationObject) {
  const formList = Array.from(document.querySelectorAll(validationObject.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement, validationObject);
  });
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return (!inputElement.validity.valid);
  })
}

function toggleButtonState (inputList, buttonElement, validationObject) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationObject.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationObject.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

export { showError, hideError, checkInputValidity, setEventListener, enableFormValidation, hasInvalidInput, toggleButtonState }; 


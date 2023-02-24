const popupProfile = document.querySelector('.popup_profile')
const popupPhotoPlace = document.querySelector('.popup_new-place')
const popupPlaceImage = document.querySelector('.popup_place-image')

const popupOpenButton = document.querySelector('.profile__edit-button')
const popupOpenAddButton = document.querySelector('.profile__add-button')

const profile = document.querySelector('.content')
const nameProfile = profile.querySelector('.profile__name')
const activityProfile = profile.querySelector('.profile__activity')
const formFieldProfile = popupProfile.querySelector('.form')
const formFieldPlace = document.querySelector('.form-place')

const nameInput = formFieldProfile.querySelector('.form__field_profile_name')
const activityInput = formFieldProfile.querySelector('.form__field_profile_activity')
const pointInput = document.querySelector('.form__field_point')
const urlInput = document.querySelector('.form__field_url')

const placeImageImage = popupPlaceImage.querySelector('.place-image__image')
const placeImageName = popupPlaceImage.querySelector('.place-image__name')
const placesList = document.querySelector('.places__list')
const template = document.querySelector('.template')

function renderPlaces() {
  const places = initialCards.map(getPlace);
  placesList.append(...places);
}

function deletePlace(evt) {
  evt.target.closest('.place').remove();
}
function likePlace(evt) {
  evt.target.classList.toggle('place__like_active');
}

renderPlaces();

function getPlace(item) {
  const newPlace = template.content.cloneNode(true);
  const placeImage = newPlace.querySelector('.place__image');
  const placeTitle = newPlace.querySelector('.place__title');
  const placeLike = newPlace.querySelector('.place__like');
  const placeDelete = newPlace.querySelector('.place__delete');

  placeImage.src = item.link;
  placeTitle.textContent = item.name;
  placeImage.alt = item.name;

  placeLike.addEventListener('click', likePlace);
  placeDelete.addEventListener('click', deletePlace);

  placeImage.addEventListener('click',() => {
    placeImageName.textContent = item.name;
    placeImageImage.alt = item.name;
    placeImageImage.src = item.link;
    popupOpen(popupPlaceImage);
  });

  return newPlace;
}

function upProfileInfo(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationFields.inputSelector));
  const buttonField = formElement.querySelector(validationFields.buttonSelector);

  nameInput.value = nameProfile.textContent;
  activityInput.value =  activityProfile.textContent;

  checkInputValidation(formElement, nameInput, validationFields.inputErrorSelector, validationFields.spanErrorValidation);
  checkInputValidation(formElement,  activityInput, validationFields.inputErrorSelector, validationFields.spanErrorValidation);
  toggleButtonState(inputList, buttonField, validationFields.buttonDisabledClass);
}

function formProfileHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value;
  popupClose(popupProfile);

}

function formPlaceHandler (evt) {
  evt.preventDefault();
  const namePlace = pointInput.value;
  const urlPlace = urlInput.value;
  const photoPlace = getPlace({name: namePlace, link: urlPlace});

  placesList.prepend(photoPlace);
  formFieldPlace.reset();
  pointInput.dispatchEvent(new Event('input'));
  urlInput.dispatchEvent(new Event('input'));
  popupClose(popupPhotoPlace);

}

popupOpenButton.addEventListener('click',() => {
  upProfileInfo(formFieldProfile);
  popupOpen(popupProfile);

});

popupOpenAddButton.addEventListener('click',() => {
  const inputPhotoPlaceList = Array.from(document.querySelectorAll('.form__field'));
  inputPhotoPlaceList.forEach((inputElement) => {
    if (!inputElement.value)  {
      hideInputError(document, inputElement, validationFields.inputErrorSelector, validationFields.spanErrorValidation);
    }
  });

  popupOpen(popupPhotoPlace);
});
function popupOpen (popupElement) {
  popupElement.classList.add('popup__opened');
  popupElement.addEventListener('click', addPopupCloseClickListener);

  document.addEventListener('keydown', addPopupCloseEscListener);
}


function popupClose (popupElement) {
  popupElement.classList.remove('popup__opened');
  popupElement.removeEventListener('click', addPopupCloseClickListener);

  document.removeEventListener('keydown', addPopupCloseEscListener);
}
function addPopupCloseClickListener(evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup') ) {
    const popupOpen = evt.currentTarget

    popupClose(popupOpen);
  }
}
function addPopupCloseEscListener(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector('.popup__opened')

    popupClose(popupOpen);
  }
}

const validationFields = {
  inputSelector:'.form__field',
  buttonSelector: '.form__save',
  buttonInactiveClass: 'form__save_inactive',
  
  inputErrorSelector: 'form__field_type_error',
  spanErrorValidation: 'form__field-error_active',
}

document.addEventListener('submit', formPlaceHandler);

formFieldProfile.addEventListener('submit', formProfileHandler);
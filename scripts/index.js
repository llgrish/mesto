const initialCards = [
  { name: 'Адыгея',
    link: './images/adigeya.jpg' },
  { name: 'Алтай',
    link: './images/altai.jpg' },
  { name: 'Камчатка',
    link: './images/kamchatka.jpg' },
  { name: 'Мурманск',
    link: './images/murmansk.jpg' },
  { name: 'Шерегеш',
    link: './images/sheregesh.jpg' },
  { name: 'Сибирь',
    link: './images/siberia.jpg' }
];

const popupMain = document.querySelector('.popup')
const popupProfile = document.querySelector('.popup_profile')
const popupPhotoPlace = document.querySelector('.popup_new-place')
const popupPlaceImage = document.querySelector('.popup_place-image')

const popupOpenButton = document.querySelector('.profile__edit-button')
const popupOpenAddButton = document.querySelector('.profile__add-button')

const popupCloseProfileButton = popupProfile.querySelector('.popup__close')
const popupClosePlaceButton = popupMain.querySelector('.popup__close')
const popupCloseImageButton = popupPlaceImage.querySelector('.popup__close')

const profile = document.querySelector('.content')
const nameProfile = profile.querySelector('.profile__name')
const activityProfile = profile.querySelector('.profile__activity')
const formFieldProfile = popupProfile.querySelector('.form')
const formFieldPlace = popupMain.querySelector('.form')

const nameInput = formFieldProfile.querySelector('.form__field_profile_name')
const activityInput = formFieldProfile.querySelector('.form__field_profile_activity')
const pointInput = formFieldPlace.querySelector('.form__field_point')
const urlInput = formFieldPlace.querySelector('.form__field_url')

const placeImageImage = popupPlaceImage.querySelector('.place-image__image')
const placeImageName = popupPlaceImage.querySelector('.place-image__name')
const placesList = document.querySelector('.places__list')
const template = document.querySelector('.template')

renderPlaces();

function renderPlaces() {
  const places = initialCards.map(getPlace);
  placesList.append(...places);
}

function getPlace(item) {
  const newPlace = template.content.cloneNode(true);
  const placeImage = newPlace.querySelector('.place__image');
  const placeTitle = newPlace.querySelector('.place__title');
  const placeLike = newPlace.querySelector('.place__like');
  const openPopupPlacePhoto = newPlace.querySelector('.place__image');
  const placeDelete = newPlace.querySelector('.place__delete');

  placeImage.src = item.link;
  placeTitle.textContent = item.name;
  placeImage.alt = item.name;
  placeLike.addEventListener('click', likePlace);
  placeDelete.addEventListener('click', deletePlace);

  openPopupPlacePhoto.addEventListener('click',() => {
    placeImageName.textContent = item.name;
    placeImageImage.alt = item.name;
    placeImageImage.src = item.link;
    togglePopup(popupPlaceImage);
  });

  return newPlace;
}

function deletePlace(event) {
  const targetElement = event.target;
  const targetItem = targetElement.closest('.place');
  targetItem.remove();
}

function formPlaceHandler (evt) {
  const pointPlace = pointInput.value;

  const elementPlace = getPlace({name: pointPlace, link: urlPlace});
  const urlPlace = urlInput.value;
  evt.preventDefault();
  placesList.prepend(elementPlace);
  pointInput.value = '';
  urlInput.value = '';
  togglePopup(popupPhotoPlace);
}

function likePlace(event) {
  const targetElement = event.target;
  targetElement.classList.toggle('place__like_active');
}

popupOpenAddButton.addEventListener('click',() => {
  togglePopup(popupPhotoPlace);
});
popupClosePlaceButton.addEventListener('click',() => {
  togglePopup(popupPhotoPlace);
});
popupCloseImageButton.addEventListener('click',() => {
  togglePopup(popupPlaceImage);
});

formFieldPlace.addEventListener('submit', formPlaceHandler);

formFieldProfile.addEventListener('submit', formProfileHandler);

function formProfileHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value;
  togglePopup(popupProfile);
}

function togglePopup (popup) {
  popup.classList.toggle('popup__opened');
}

function upProfileInfo() {
  nameInput.value = nameProfile.textContent
  activityInput.value = activityProfile.textContent;
}

popupOpenButton.addEventListener('click',() => {
  upProfileInfo();
  togglePopup(popupProfile);
});
popupCloseProfileButton.addEventListener('click',() => {
  togglePopup(popupProfile);
});
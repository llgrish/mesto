let initialCards = [
  {
    name: 'Адыгея',
    link: './images/adigeya.jpg'
  },
  {
    name: 'Алтай',
    link: './images/altai.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/kamchatka.jpg'
  },
  {
    name: 'Мурманск',
    link: './images/murmansk.jpg'
  },
  {
    name: 'Шерегеш',
    link: './images/sheregesh.jpg'
  },
  {
    name: 'Сибирь',
    link: './images/siberia.jpg'
  }
];

let popup = document.querySelector('.popup')
let openPopupButton = document.querySelector('.profile__edit-button')
let openPopupAddButton = document.querySelector('.profile__add-button')

let popupProfile = document.querySelector('.popup_profile')
let closePopupProfileButton = popupProfile.querySelector('.popup__close')
let formFieldProfile = popupProfile.querySelector('.form')
let nameInput = formFieldProfile.querySelector('.form__field_profile_name')
let activityInput = formFieldProfile.querySelector('.form__field_profile_activity')

let popupPhotoPlace = document.querySelector('.popup_new-place')
let closePopupPlaceButton = popup.querySelector('.popup__close')
let formFieldPlace = popup.querySelector('.form')
let pointInput = formFieldPlace.querySelector('.form__field_point')
let urlInput = formFieldPlace.querySelector('.form__field_url')

let popupPlaceImage = document.querySelector('.popup_place-image')
let placeImageImage = popupPlaceImage.querySelector('.place-image__image')
let placeImageName = popupPlaceImage.querySelector('.place-image__name')
let closePopupImageButton = popupPlaceImage.querySelector('.popup__close')

let profile = document.querySelector('.content')
let nameProfile = profile.querySelector('.profile__name')
let activityProfile = profile.querySelector('.profile__activity')
let placesList = document.querySelector('.places__list')
let template = document.querySelector('.template')

function togglePopup (pop) {
  pop.classList.toggle('popup__opened');
}

function upProfileInfo() {
  nameInput.value = nameProfile.textContent
  activityInput.value = activityProfile.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value;

  togglePopup(popupProfile);
}

function getPlace(item) {
  let newPlace = template.content.cloneNode(true);
  let placeImage = newPlace.querySelector('.place__image');
  let placeTitle = newPlace.querySelector('.place__title');
  let placeDelete = newPlace.querySelector('.place__delete');
  let placeLike = newPlace.querySelector('.place__like');
  let openPopupPlaceImage = newPlace.querySelector('.place__image');

  placeImage.src = item.link;
  placeImage.alt = item.name;
  placeTitle.textContent = item.name;

  placeDelete.addEventListener('click', deletePlace);
  placeLike.addEventListener('click', likePlace);

  openPopupPlaceImage.addEventListener('click',() => {
    placeImageName.textContent = item.name;
    placeImageImage.src = item.link;
    placeImageImage.alt = item.name;

    togglePopup(popupPlaceImage);
  });

  return newPlace;
}

function formPlaceHandler (evt) {
  let pointPlace = pointInput.value;
  let urlPlace = urlInput.value;
  let photoPlace = getPlace({name: pointPlace, link: urlPlace});

  evt.preventDefault();
  placesList.prepend(photoPlace);
  pointInput.value = '';
  urlInput.value = '';

  togglePopup(popupPhotoPlace);
}

function renderPlaces() {
  let places = initialCards.map(getPlace);

  placesList.append(...places);
}


function deletePlace(event) {
  let targetElement = event.target;
  let targetItem = targetElement.closest('.place');

  targetItem.remove();
}

function likePlace(event) {
  let targetElement = event.target;
  targetElement.classList.toggle('place__like_active');
}

renderPlaces();

openPopupButton.addEventListener('click',() => {
  upProfileInfo();
  togglePopup(popupProfile);
});
openPopupAddButton.addEventListener('click',() => {
  togglePopup(popupPhotoPlace);
});
closePopupProfileButton.addEventListener('click',() => {
  togglePopup(popupProfile);
});
closePopupPlaceButton.addEventListener('click',() => {
  togglePopup(popupPhotoPlace);
});
closePopupImageButton.addEventListener('click',() => {
  togglePopup(popupPlaceImage);
});
formFieldProfile.addEventListener('submit', formSubmitHandler);
formFieldPlace.addEventListener('submit', formPlaceHandler);

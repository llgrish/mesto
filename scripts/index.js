// карточки мест
const initialCards = [
  { name: 'Адыгея', link: 'https://llgrish.github.io/images/adigeya.jpg' },
  { name: 'Алтай', link: 'https://llgrish.github.io/images/altai.jpg' },
  { name: 'Камчатка', link: 'https://llgrish.github.io/images/kamchatka.jpg' },
  { name: 'Мурманск', link: 'https://llgrish.github.io/images/murmansk.jpg' },
  { name: 'Шерегеш', link: 'https://llgrish.github.io/images/sheregesh.jpg' },
  { name: 'Сибирь', link: 'https://llgrish.github.io/images/siberia.jpg' },
];

// Листинг карточек мест 
const placesList = document.querySelector('.places__list');

function addInitialPlaceCard() {
  initialCards.forEach((item) => {
    const placeTemplate = document
      .querySelector('#place')
      .content.cloneNode(true);

    const placeCard = placeTemplate.querySelector('.place');

    const placeImage = placeCard.querySelector('.place__image');

    const placeTitle = placeCard.querySelector('.place__title');
    placeImage.setAttribute('alt', item.name);
    placeImage.setAttribute('src', item.link);
    placeTitle.textContent = item.name;
    const listItem = document.createElement('li');
    listItem.append(placeCard);
    placesList.append(listItem);
  });
}

addInitialPlaceCard();

// поля модального окна
let profile = document.querySelector('.profile'),
  profileTitle = profile.querySelector('.profile__title'),
  profileDescription = profile.querySelector('.profile__description'),
  profileEditButton = profile.querySelector('.button_type_edit'),
  place_like_buttons = document.querySelectorAll('.button_type_like');

  for (let i = 0; i < place_like_buttons.length; i++) {
    place_like_buttons[i].addEventListener('click', function () {
      place_like_buttons[i].classList.toggle('button_active');
    });
  }

  // модальное окно
  popup = document.querySelector('.popup'),
  popupForm = popup.querySelector('.popup__form'),
  popupCloseButton = popup.querySelector('.button_type_close'),

  // инпуты имени и должности
  inputName = popup.querySelector('.form__input_type_name'),
  inputPost = popup.querySelector('.form__input_type_post');

// открытие модального окна
function openPopup() {
  inputName.value = profileTitle.textContent;
  inputPost.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

// закрытие модального окна
function closePopup() {
  popup.classList.remove('popup_opened');
}

// редактирование профиля - сохранение
function saveProfileChanges(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputPost.value;
  closePopup();
}

// редактировать, сохранить, закрыть
profileEditButton.addEventListener('click', openPopup);
popupForm.addEventListener('submit', saveProfileChanges);
popupCloseButton.addEventListener('click', closePopup);
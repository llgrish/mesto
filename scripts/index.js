let popup = document.querySelector('.popup')
let closePopupButton = popup.querySelector('.popup__close')

let openPopupButton = document.querySelector('.profile__edit-button')
let profile = document.querySelector('.profile')
let titleProfile = profile.querySelector('.profile__name')
let activityProfile = profile.querySelector('.profile__activity')

let formField = popup.querySelector('.form')
let nameInput = formField.querySelector('.form__field_name_main')
let activityInput = formField.querySelector('.form__field_activity_about')

openPopupButton.addEventListener('click', OpenForm)
closePopupButton.addEventListener('click', CloseForm)
formField.addEventListener('submit', formSubmitHandler);

function OpenForm() {
  popup.classList.toggle("popup__opened")
  nameInput.value = titleProfile.textContent
  activityInput.value = activityProfile.textContent;
}


function CloseForm() {
  popup.classList.toggle("popup_opened");
  OpenForm()
}


function formSubmitHandler (evt) {
  evt.preventDefault();
  titleProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value
  OpenForm()
}
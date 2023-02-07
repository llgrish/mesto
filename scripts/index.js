let popup = document.querySelector('.popup')
let closePopupButton = popup.querySelector('.popup__close')

let openPopupButton = document.querySelector('.profile__edit-button')
let profile = document.querySelector('.profile')
let titleProfile = profile.querySelector('.profile__name')
let activityProfile = profile.querySelector('.profile__activity')

let formField = popup.querySelector('.form')
let nameInput = formField.querySelector('.form__field_profile_name')
let activityInput = formField.querySelector('.form__field_profile_activity')

openPopupButton.addEventListener('click', openForm)
closePopupButton.addEventListener('click', closeForm)
formField.addEventListener('submit', formSubmitHandler);

function openForm() {
  popup.classList.toggle("popup__opened")
  nameInput.value = titleProfile.textContent
  activityInput.value = activityProfile.textContent;
}


function closeForm() {
  popup.classList.toggle("popup__opened");
}


function formSubmitHandler (evt) {
  evt.preventDefault();
  titleProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value
  closeForm()
}
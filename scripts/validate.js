const checkInputValidation = (formField, inputField) => {

  if (!inputField.validity.valid) {
    showInputError(formField, inputField, inputField.validationMessage, {inputErrorSelector, spanErrorValidation});
  } else {
    hideInputError(formField, inputField, {inputErrorSelector, spanErrorValidation});
  }
};

const elemFields = {
    formSelector:'.form',
    inputSelector:'.form__field',
    buttonSelector: '.form__save',
    buttonDisabledClass: 'form__save_inactive',
    inputErrorSelector: 'form__field_type_error',
    spanErrorValidation: 'form__field-error_active'
  }
  const {
    formSelector,
    inputSelector,
    buttonSelector,
    buttonDisabledClass,
    inputErrorSelector,
    spanErrorValidation
  } = elemFields

  const setEventListeners = (formField, {inputSelector, buttonSelector, buttonDisabledClass}) => {
    const inputList = Array.from(formField.querySelectorAll(inputSelector));
    const buttonField = formField.querySelector(buttonSelector);
    
    toggleButtonState(inputList, buttonField)

    inputList.forEach((inputField) => {
      inputField.addEventListener('input', function () {
        checkInputValidation(formField, inputField);
        toggleButtonState(inputList, buttonField, buttonDisabledClass);
      });

    });
  };
 
  const showInputError = (formField, inputField, errorMessage, {inputErrorSelector, spanErrorValidation}) => {
    const errorField = formField.querySelector(`.${inputField.name}-error`);

    inputField.classList.add(inputErrorSelector);
    errorField.textContent = errorMessage;

    errorField.classList.add(spanErrorValidation);
  };

  const hideInputError = (formField, inputField, {inputErrorSelector, spanErrorValidation}) => {
    const errorField = formField.querySelector(`.${inputField.name}-error`);
    inputField.classList.remove(inputErrorSelector);
    errorField.classList.remove(spanErrorValidation);
    errorField.textContent = '';
  };
  
  const enableValidation = ({formSelector}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formField) => {
      formField.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      setEventListeners(formField, {inputSelector, buttonSelector, buttonDisabledClass});
    });
  };

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(buttonDisabledClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(buttonDisabledClass);
    }
  }

  const hasInvalidInput = (inputList) => {

    return inputList.some((inputField) => {
      return !inputField.validity.valid;
    })
  }
  
  enableValidation(elemFields);
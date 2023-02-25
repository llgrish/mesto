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

  const hasInvalidInput = (inputList) => {

    return inputList.some((inputField) => !inputField.validity.valid);
  }
  
  const enableValidation = ({formSelector, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formField) => {
      formField.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      setEventListeners(formField, rest);
    });
  };

  const setEventListeners = (formField, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
    const inputList = Array.from(formField.querySelectorAll(inputSelector));
    const buttonField = formField.querySelector(buttonSelector);

    toggleButtonState(inputList, buttonField, buttonDisabledClass)

    inputList.forEach((inputField) => {
      inputField.addEventListener('input', () => {
        checkInputValidation(formField, inputField, rest);
        toggleButtonState(inputList, buttonField, buttonDisabledClass);
      });

    });
  };

  const toggleButtonState = (inputList, buttonField) => {
    if (hasInvalidInput(inputList)) {
      buttonField.classList.add(buttonDisabledClass);
      buttonField.disabled = true;
    } else {
      buttonField.classList.remove(buttonDisabledClass);
      buttonField.disabled = false;
    }
  }
  
  enableValidation(elemFields);
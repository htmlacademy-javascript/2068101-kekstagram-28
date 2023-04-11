import {isEscapeKey} from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const newMessageSuccess = successMessageTemplate.cloneNode(true);
const successButton = newMessageSuccess.querySelector('.success__button');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const newMessageError = errorMessageTemplate.cloneNode(true);
const errorButton = newMessageError.querySelector('.error__button');

successButton.addEventListener('click', () => {
  newMessageSuccess.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
});

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('.success')) {
    newMessageSuccess.remove();
  }
});

const showSuccessMessage = () => {
  document.body.append(newMessageSuccess);
  document.addEventListener('keydown', onDocumentKeydown);
};


errorButton.addEventListener('click', () => {
  newMessageError.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
});

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('error')) {
    newMessageError.remove();
  }
});

const showErrorMessage = () => {
  document.body.append(newMessageError);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    newMessageSuccess.remove();
    newMessageError.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

export {showSuccessMessage, showErrorMessage};

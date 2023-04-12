import {isEscapeKey} from './util.js';

const body = document.body;
const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const newMessageSuccessElement = successMessageTemplateElement.cloneNode(true);
const successButtonElement = newMessageSuccessElement.querySelector('.success__button');
const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
const newMessageErrorElement = errorMessageTemplateElement.cloneNode(true);
const errorButtonElement = newMessageErrorElement.querySelector('.error__button');

successButtonElement.addEventListener('click', () => {
  newMessageSuccessElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
});

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('.success')) {
    newMessageSuccessElement.remove();
  }
});

const showSuccessMessage = () => {
  body.append(newMessageSuccessElement);
  document.addEventListener('keydown', onDocumentKeydown);
};


errorButtonElement.addEventListener('click', () => {
  newMessageErrorElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
});

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('error')) {
    newMessageErrorElement.remove();
  }
});

const showErrorMessage = () => {
  body.append(newMessageErrorElement);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    newMessageSuccessElement.remove();
    newMessageErrorElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

export {showSuccessMessage, showErrorMessage};

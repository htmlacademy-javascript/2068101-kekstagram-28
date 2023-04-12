import {isEscapeKey} from './util.js';
import {pristine} from './validation.js';
import {resetScale} from './image-scale.js';
import {resetFilters} from './image-effect.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

const body = document.body;
const formElement = document.querySelector('.img-upload__form');
const imgUploadInputElement = document.querySelector('#upload-file');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadCancelElement = document.querySelector('.img-upload__cancel');
const textHashtagElement = document.querySelector('.text__hashtags');
const textDescriptionElement = document.querySelector('.text__description');
const imgUploadButtonElement = document.querySelector('.img-upload__submit');
const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const isInputActive = () =>
  document.activeElement === textHashtagElement || document.activeElement === textDescriptionElement;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInputActive()) {
    evt.preventDefault();
    onCloseModal();
  }
};

const onDisabledButton = () => pristine.validate() ? imgUploadButtonElement.removeAttribute('disabled') : imgUploadButtonElement.setAttribute('disabled');

const blockSubmitButton = () => {
  imgUploadButtonElement.disabled = true;
  imgUploadButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  imgUploadButtonElement.disabled = false;
  imgUploadButtonElement.textContent = SubmitButtonText.IDLE;
};

const onOpenModal = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  body.classList.add('modal-open');
  imgUploadInputElement.addEventListener('keydown', onDocumentKeydown);
  imgUploadCancelElement.addEventListener('click', onCloseModal);
  textHashtagElement.addEventListener('input', onDisabledButton);
};

function onCloseModal() {
  formElement.reset();
  pristine.reset();
  resetScale();
  resetFilters();
  imgUploadOverlayElement.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInputElement.removeEventListener('keydown', onDocumentKeydown);
  imgUploadCancelElement.removeEventListener('click', onCloseModal);
  textHashtagElement.removeEventListener('input', onDisabledButton);
}

imgUploadInputElement.addEventListener('change', onOpenModal);

const setUserFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(formData)
        .then(() => {
          onCloseModal();
          showSuccessMessage();
        })
        .catch(() => {
          showErrorMessage();
        })
        .finally(unblockSubmitButton);
    }
  });
};
export {onDocumentKeydown, onCloseModal, setUserFormSubmit};

import {isEscapeKey} from './util.js';
import {pristine} from './validation.js';
import {resetScale} from './image-scale.js';
import {resetFilters} from './image-effect.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

const body = document.body;
const form = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const textHashtag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadButton = document.querySelector('.img-upload__submit');

const ifInTextFieldFocused = () =>
  document.activeElement === textHashtag || document.activeElement === textDescription;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !ifInTextFieldFocused()) {
    evt.preventDefault();
    onCloseModal();
  }
};

const onDisabledButton = () => {
  if (pristine.validate() === true) {
    imgUploadButton.removeAttribute('disabled');
  } else {
    imgUploadButton.setAttribute('disabled', true);
  }
};

const onOpenModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadCancel.addEventListener('click', onCloseModal);
  textHashtag.addEventListener('input', onDisabledButton);
};

function onCloseModal() {
  form.reset();
  pristine.reset();
  resetScale();
  resetFilters();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadCancel.removeEventListener('click', onCloseModal);
  textHashtag.removeEventListener('input', onDisabledButton);
}

imgUploadInput.addEventListener('change', onOpenModal);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(showSuccessMessage)
      .catch(() => {
        showErrorMessage();
      });
  }
});

export {onDocumentKeydown, onCloseModal};

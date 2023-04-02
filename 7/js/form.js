import {isEscapeKey} from './util.js';

const MAX_HASHTAGS = 5;
const HASHTAGS_SYBMOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAGS_ERROR_MESSAGE = 'Неправильно введены хештеги';

const body = document.body;
const form = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const textHashtag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const ifInTextFieldFocused = () =>
  document.activeElement === textHashtag || document.activeElement === textDescription;


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !ifInTextFieldFocused()) {
    evt.preventDefault();
    closeModal();
  }
};

const openModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadCancel.addEventListener('click', closeModal);
};

function closeModal () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadCancel.removeEventListener('click', closeModal);
  form.reset();
  pristine.reset();
}

const isValidTag = (tag) => HASHTAGS_SYBMOLS.test(tag);

const hasValidTagCount = (tags) => tags.length <= MAX_HASHTAGS;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hasValidTagCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  textHashtag,
  validateTags,
  TAGS_ERROR_MESSAGE
);

// const onFormSubmit = (evt) => {
//   evt.preventDefault();
//   pristine.validate();
// };

// imgUploadInput.addEventListener('change', onFileInputChange);
// imgUploadCancel.addEventListener('click', onCancelButtonClick);
// form.addEventListener('submit', onFormSubmit);

imgUploadInput.addEventListener('change', () =>
  openModal()
);

imgUploadButton.addEventListener('input', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

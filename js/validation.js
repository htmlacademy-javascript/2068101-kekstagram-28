const MAX_HASHTAGS = 5;
const MAX_HASHTAGS_LENGHT = 20;
const HASHTAGS_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAGS_ERROR_MESSAGE = 'Хэштег должен начинаться с "#" и содержать буквы и цифры';
const TAGS_ERROR_MESSAGE_REPEAT = 'Каждый хештег должен быть уникальным';
const TAGS_ERROR_MESSAGE_COUNT = 'Нельзя указать больше 5-ти хэштегов';
const TAGS_ERROR_MESSAGE_LENGTH = 'Максимальная длина одного хэш-тега 20 символов';

const formElement = document.querySelector('.img-upload__form');
const textHashtagElement = document.querySelector('.text__hashtags');

const pristine = new Pristine (formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const getHashtag = (value) => value.trim().split(' ').filter((tag) => tag.trim().length);

const validateHashtagLength = (value) => getHashtag(value).every((item) => item.length <= MAX_HASHTAGS_LENGHT);

const validateHashtagCount = (value) => getHashtag(value).length <= MAX_HASHTAGS;

const validateHashtagSymbol = (value) => getHashtag(value).every((item) => HASHTAGS_SYMBOLS.test(item));

const validateHashtagUniqueness = (tags) => {
  const lowerCaseTags = getHashtag(tags).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(textHashtagElement, validateHashtagSymbol, TAGS_ERROR_MESSAGE);
pristine.addValidator(textHashtagElement, validateHashtagLength, TAGS_ERROR_MESSAGE_LENGTH);
pristine.addValidator(textHashtagElement, validateHashtagCount, TAGS_ERROR_MESSAGE_COUNT);
pristine.addValidator(textHashtagElement, validateHashtagUniqueness, TAGS_ERROR_MESSAGE_REPEAT);

export {pristine};

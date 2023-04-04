const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

const getAvatar = (int) => `img/avatar-${int}.svg`;

const getMessage = (array, int) => {
  let result = '';
  for (let i = 0; i < int; i++) {
    result += getRandomArrayElement(array);
    if (i < int) {
      result += ' ';
    }
  }
  return result;
};

const getName = (array) => getRandomArrayElement(array);

const getPhotoUrl = (id) => `photos/${id}.jpg`;

const createRandomId = (min, max) => {
  const values = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    if (values.length >= (max - min + 1)) {
      return null;
    }
    while (values.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    values.push(currentValue);
    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomNumber, getRandomArrayElement, getAvatar, getMessage, getName, getPhotoUrl, createRandomId, isEscapeKey};

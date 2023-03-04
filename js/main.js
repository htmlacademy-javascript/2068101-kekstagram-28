const names = ['Владислав', 'Алина', 'Елена', 'Василий', 'Дмитрий', 'Екатерина'];
const specifications = [
  'Отдыхаю на море',
  'Привет из 2007',
  'Моя новая ласточка',
  'Happy BirthDay to me',
  'Это я в музее',
  'Ночные покатушки',
  'Wedding Day',
  'А тут мы кушаем, очень вкусно'
];
const offers = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomArbitrary = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (array) => array[getRandomArbitrary(0, array.length - 1)];

const getRandomId = (index1, index2) => {
  const sum = String(index1) + String(index2);
  return Number(sum);
};

const getAvatar = (int) => `img/avatar-${int}.svg`;

const getMessage = (array, int) => {
  let result = '';
  for (let i = 1; i < int; i++) {
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
    let currentValue = getRandomArbitrary(min, max);
    if (values.length >= (max - min + 1)) {
      return null;
    }
    while (values.includes(currentValue)) {
      currentValue = getRandomArbitrary(min, max);
    }
    values.push(currentValue);
    return currentValue;
  };
};

const generateId = createRandomId(1, 25);
const generateUrlId = createRandomId(1, 25);

const getComments = (index) => {
  const result = [];
  for (let i = 1; i <= getRandomArbitrary(1, 6); i++) {
    result.push({
      id: getRandomId(index, i),
      avatar: getAvatar(getRandomArbitrary(1, 6)),
      message: getMessage(offers, getRandomArbitrary(1, 2)),
      name: getName(names)
    });
  }
  return result;
};

const getPhotoDescription = () => {
  const result = [];
  for (let i = 1; i < 26; i++) {
    result.push({
      id: generateId(),
      url: getPhotoUrl(generateUrlId()),
      description: getRandomArrayElement(specifications),
      likes: getRandomArbitrary(15, 200),
      comments: getComments(i)
    });
  }
  return result;
};

console.log(getPhotoDescription());


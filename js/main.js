const names = ['Владислав', 'Алина', 'Елена', 'Василий', 'Дмитрий', 'Екатерина'];
const specifications = [
  'Отдыхаю на море',
  'Привет из 2007',
  'Моя новая ласточка',
  'Happy BirthDay to me',
  'Это я в музее',
  'Ночные покатушки',
  'Wedding Day',
  'А тут мы кушаем, очень вкусно',
  'Как провести идеальный выходной',
  'Новый любимый наряд',
  'Отличный день для прогулки по городу',
  'В поисках приключений',
  'Мой пушистый друг',
  'Кофе — мой лучший друг'
];
const offers = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

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

const generateId = createRandomId(1, 25);
const generateUrlId = createRandomId(1, 25);
const generateCommentId = createRandomId(1, 50);

const getComments = () => {
  const result = [];
  const number = getRandomNumber(1, 2);
  for (let i = 1; i <= number; i++) {
    result.push({
      id: generateCommentId(),
      avatar: getAvatar(getRandomNumber(1, 6)),
      message: getMessage(offers, getRandomNumber(1, 2)),
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
      likes: getRandomNumber(15, 200),
      comments: getComments(getRandomNumber(1, 2))
    });
  }
  return result;
};

getPhotoDescription();

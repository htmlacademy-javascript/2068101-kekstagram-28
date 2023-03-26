import {getRandomNumber, getRandomArrayElement, getAvatar, getMessage, getName, getPhotoUrl, createRandomId} from './util.js';

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

const PHOTO_COUNT = 25;
const MAX_COUNT_COMMENT = 200;
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

const getPhotoDescription = () => ({
  id: generateId(),
  url: getPhotoUrl(generateUrlId()),
  description: getRandomArrayElement(specifications),
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(1, MAX_COUNT_COMMENT)}, getComments)
});

const getPhotoDescriptions = () => Array.from({length: PHOTO_COUNT},getPhotoDescription);

export {getPhotoDescriptions};

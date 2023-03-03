const username = ['Владислав', 'Алина', 'Елена', 'Василий', 'Дмитрий', 'Екатерина'];
const specification = [
  'Отдыхаю на море',
  'Привет из 2007',
  'Моя новая ласточка',
  'Happy BirthDay to me',
  'Это я в музее',
  'Ночные покатушки',
  'Wedding Day',
  'А тут мы кушаем, очень вкусно'];
const offers = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const getRandomArbitrary = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const getRandomArrayElement = (elements) => elements[getRandomArbitrary(0, elements.length - 1)];
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

const generatorPhotoId = createRandomId(1, 25);
const generatorUrlId = createRandomId(1, 25);
const generatorCommentId = createRandomId(1, 100);

const resultComments = [];
for (let i = 0; i < 25; i++) {
  resultComments.push(
    { id: generatorCommentId(),
      avatar: `img/avatar-${getRandomArbitrary(1, 6)}.svg`,
      message: getRandomArrayElement(offers),
      name: getRandomArrayElement(username)}
  );
}

const result = [];
for (let i = 0; i < 25; i++) {
  result.push(
    { id: generatorPhotoId(),
      url: `photos/${generatorUrlId()}.jpg`,
      description: getRandomArrayElement(specification),
      likes: getRandomArbitrary(15, 200),
      comments: getRandomArrayElement(resultComments)}
  );
}

import {getPhotoDescriptions} from './data.js';

const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const thumbnailContainer = document.querySelector('.pictures');
const thumbnails = getPhotoDescriptions();

const thumbnailFragment = document.createDocumentFragment();

thumbnails.forEach(({ url,likes ,comments}) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailFragment.appendChild(thumbnailElement);
});

thumbnailContainer.appendChild(thumbnailFragment);

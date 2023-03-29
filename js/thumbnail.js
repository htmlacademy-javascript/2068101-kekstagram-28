const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const thumbnailContainer = document.querySelector('.pictures');
const thumbnailPhotoFragment = document.createDocumentFragment();

const renderThumbnail = (data) => {
  data.forEach(({comments, url, likes, id}) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    thumbnailElement.querySelector('.picture__img').src = url;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailElement.dataset.thumbnailId = id;
    thumbnailPhotoFragment.append(thumbnailElement);
  });
  thumbnailContainer.appendChild(thumbnailPhotoFragment);
};

export {renderThumbnail, thumbnailContainer};

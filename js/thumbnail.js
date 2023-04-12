const thumbnailTemplateElement = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const thumbnailContainerElement = document.querySelector('.pictures');
const thumbnailPhotoElement = document.createDocumentFragment();

const renderThumbnail = (data) => {
  thumbnailContainerElement.querySelectorAll('.picture').forEach((element) => element.remove());
  data.forEach(({comments, url, likes, id}) => {
    const thumbnailElement = thumbnailTemplateElement.cloneNode(true);
    thumbnailElement.querySelector('.picture__img').src = url;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailElement.dataset.thumbnailId = id;
    thumbnailPhotoElement.append(thumbnailElement);
  });
  thumbnailContainerElement.appendChild(thumbnailPhotoElement);
};

export {renderThumbnail, thumbnailContainerElement};

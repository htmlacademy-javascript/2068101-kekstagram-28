import {isEscapeKey} from './util.js';
import {thumbnailContainer, renderThumbnail} from './thumbnail.js';

const body = document.body;
const bigPhotoElement = document.querySelector('.big-picture');
const bigPhotoCloseElement = document.querySelector('.big-picture__cancel');
const socialCommentsElement = document.querySelector('.social__comments');
const socialCommentsItemElement = document.querySelector('.social__comment');
const socialCommentCountElement = document.querySelector('.social__comment-count');
const socialCommentLoaderElement = document.querySelector('.social__comments-loader');

const COMMENTS_COUNT = 5;
let commentsShow = 0;
let comments = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseUserModal();
  }
};

const renderComment = (({ avatar, name, message }) => {
  const comment = socialCommentsItemElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
});

const renderComments = () => {
  commentsShow += COMMENTS_COUNT;

  if (commentsShow >= comments.length) {
    socialCommentLoaderElement.classList.add('hidden');
    commentsShow = comments.length;
  } else {
    socialCommentLoaderElement.classList.remove('hidden');
  }
  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShow; i++) {
    const commentElement = renderComment(comments[i]);
    commentsFragment.append(commentElement);
  }
  socialCommentsElement.innerHTML = '';
  socialCommentsElement.append(commentsFragment);
  socialCommentCountElement.innerHTML = `${commentsShow} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const onCommentsLoaderButtonClick = () => renderComments();
socialCommentLoaderElement.addEventListener('click', onCommentsLoaderButtonClick);

const renderBigPhoto = ({url, likes, description}) => {
  bigPhotoElement.querySelector('.big-picture__img img').src = url;
  bigPhotoElement.querySelector('.likes-count').textContent = likes;
  bigPhotoElement.querySelector('.social__caption').textContent = description;
};

const openBigPhoto = (data) => {
  bigPhotoElement.classList.remove('hidden');
  body.classList.add('modal-open');
  renderBigPhoto(data);
  comments = data.comments;
  commentsShow = 0;
  renderComments();

  document.addEventListener('keydown', onDocumentKeydown);
};

function onCloseUserModal () {
  bigPhotoElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPhotoCloseElement.addEventListener('click', onCloseUserModal);

const renderGallery = (data) => {
  renderThumbnail(data);
  thumbnailContainer.addEventListener('click', (evt) => {
    const picturesWindow = evt.target.closest('[data-thumbnail-id]');
    if (!picturesWindow) {
      return;
    }
    const picturesImg = data.find(
      (item) => item.id === Number(picturesWindow.dataset.thumbnailId)
    );

    openBigPhoto(picturesImg);
  });
};

export {renderGallery};

// import {generatedComment} from './comment.js';
import {isEscapeKey} from './util.js';
import {thumbnailContainer, renderThumbnail} from './thumbnail.js';

const body = document.body;
const bigPhoto = document.querySelector('.big-picture');
const bigPhotoClose = document.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
const socialCommentsItem = document.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const socialCommentLoader = document.querySelector('.social__comments-loader');

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
  const comment = socialCommentsItem.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
});

const renderComments = () => {
  commentsShow += COMMENTS_COUNT;

  if (commentsShow >= comments.length) {
    socialCommentLoader.classList.add('hidden');
    commentsShow = comments.length;
  } else {
    socialCommentLoader.classList.remove('hidden');
  }
  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShow; i++) {
    const commentElement = renderComment(comments[i]);
    commentsFragment.append(commentElement);
  }
  socialComments.innerHTML = '';
  socialComments.append(commentsFragment);
  socialCommentCount.innerHTML = `${commentsShow} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const onCommentsLoaderButtonClick = () => renderComments();
socialCommentLoader.addEventListener('click', onCommentsLoaderButtonClick);

const renderBigPhoto = ({url, likes, description}) => {
  bigPhoto.querySelector('.big-picture__img img').src = url;
  bigPhoto.querySelector('.likes-count').textContent = likes;
  bigPhoto.querySelector('.social__caption').textContent = description;
};

const openBigPhoto = (data) => {
  bigPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  renderBigPhoto(data);
  comments = data.comments;
  commentsShow = 0;
  renderComments();

  document.addEventListener('keydown', onDocumentKeydown);
};

function onCloseUserModal () {
  bigPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPhotoClose.addEventListener('click', onCloseUserModal);

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

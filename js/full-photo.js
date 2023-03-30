import {generatedComment} from './comment.js';
import {isEscapeKey} from './util.js';
import {thumbnailContainer} from './thumbnail.js';

const body = document.body;
const bigPhoto = document.querySelector('.big-picture');
const bigPhotoClose = document.querySelector('.big-picture__cancel');
const bigPhotoSocialComments = document.querySelector('.social__comments');
const bigPhotoSocialComment = document.querySelector('.social__comment-count');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const renderBigPhoto = (data) => {
  bigPhoto.classList.remove('hidden');
  bigPhoto.querySelector('.big-picture__img img').src = data.url;
  bigPhoto.querySelector('.likes-count').textContent = data.likes;
  bigPhoto.querySelector('.social__caption').textContent = data.description;
  bigPhotoSocialComments.innerHTML = '';
  generatedComment(data.comments);
  bigPhotoSocialComment.classList.add('hidden');
  body.classList.add('modal-open');

  bigPhotoClose.addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPhoto.classList.add('hidden');
    body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUserModal () {
  bigPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.remove('modal-open');
}

const openBigPicture = (picture) => {
  thumbnailContainer.addEventListener('click', (evt) => {
    const picturesWindow = evt.target.closest('[data-thumbnail-id]');
    if (!picturesWindow) {
      return;
    }

    const picturesImg = picture.find(
      (item) => item.id === Number(picturesWindow.dataset.thumbnailId)
    );

    renderBigPhoto(picturesImg);
  });
};

export {openBigPicture};


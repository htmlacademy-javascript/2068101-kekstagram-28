const template = document.querySelector('#big-picture__comment').content.querySelector('.social__comment');
const commentContainer = document.querySelector('.social__comments');

const generatedComment = (data) => {
  data.forEach(({avatar, message, name}) => {
    const commentElement = template.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentContainer.appendChild(commentElement);
  });
};
export {generatedComment};

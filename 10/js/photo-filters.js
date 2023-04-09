const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const comparePictures = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;
const sortRandom = () => Math.random() - 0.5;

const getFilterPictures = () =>{
  switch(currentFilter){
    case Filter.RANDOM: return pictures.slice().sort(sortRandom).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED: return pictures.sort(comparePictures);
    default: return pictures.slice();
  }
};

const setOnFilterClick = (callback) =>{
  filterElement.addEventListener('click', (evt) =>{
    if(!evt.target.classList.contains('img-filters__button')){
      return;
    }
    const clickButton = evt.target;
    if(clickButton.id === currentFilter){
      return;
    }
    filterElement.querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickButton.classList.add('img-filters__button--active');
    currentFilter = clickButton.id;
    callback(getFilterPictures());
  });
};

const init = (loadedPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = loadedPictures.slice();
  setOnFilterClick(callback);
};

export {init, getFilterPictures};

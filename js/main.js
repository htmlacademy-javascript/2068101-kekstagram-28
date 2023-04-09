import './form.js';
import {renderGallery} from './full-photo.js';
import { getData } from './api.js';
import {debounce, showAlert} from './util.js';
import {init, getFilterPictures} from './photo-filters.js';

const debounceRenderGallery = debounce(renderGallery);

getData()
  .then((data) => {
    init(data, debounceRenderGallery);
    renderGallery(getFilterPictures());
  })
  .catch((err) => {
    showAlert(err.message);
  });

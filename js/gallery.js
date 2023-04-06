import {openBigPicture} from './full-photo.js';
import { getData } from './api.js';
import {showAlert} from './message.js';

getData()
  .then((data) =>
    openBigPicture(data)
  ).
  catch(() => {
    showAlert();
  });

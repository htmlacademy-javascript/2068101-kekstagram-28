import {photoList} from './data.js';
import {renderThumbnail} from './thumbnail.js';
import {openBigPicture} from './full-photo.js';
import './form.js';

openBigPicture(photoList);
renderThumbnail(photoList);


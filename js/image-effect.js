const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];

const imageElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');

let chosenFilter = EFFECTS[0];

const isDefault = () => chosenFilter === EFFECTS[0];

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenFilter.min,
      max: chosenFilter.max,
    },
    step: chosenFilter.step,
    start: chosenFilter.max,
  });

  if(isDefault()){
    hideSlider();
  } else {
    showSlider();
  }
};

const onFiltersChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenFilter = EFFECTS.find((filter) => filter.name === evt.target.value);
  imageElement.className = `effects__preview--${chosenFilter.name}`;
  updateSlider();
};

const onSliderUpdate = () =>{
  const sliderValue = sliderElement.noUiSlider.get();
  imageElement.style.filter = isDefault()
    ? EFFECTS[0].style
    : `${chosenFilter.style}(${sliderValue}${chosenFilter.unit})`;
  effectLevelElement.value = sliderValue;
};

const resetFilters = () => {
  chosenFilter = EFFECTS[0];
  updateSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: EFFECTS[0].min,
    max: EFFECTS[0].max,
  },
  start: EFFECTS[0].max,
  step: EFFECTS[0].step,
  connect:'lower',
});

hideSlider();

effectsElement.addEventListener('change', onFiltersChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetFilters};

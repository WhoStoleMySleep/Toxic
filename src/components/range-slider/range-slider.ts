import noUiSlider from 'nouislider';
import { HTML } from '../../ts/types';

const rangeSlider: HTML['Element'] = document.querySelector('.js-range-slider__slider');
const firstValue: HTML['Element'] = document.querySelector('.js-range-slider__amount-first');
const lastValue: HTML['Element'] = document.querySelector('.js-range-slider__amount-last');

if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [5000, 10000],
    connect: true,
    step: 1,
    range: {
      min: 0,
      max: 15500,
    },
  }).on('update', (values) => {
    if (firstValue && lastValue) {
      firstValue.innerHTML = `${Math.round(+values[0])}₽`;
      lastValue.innerHTML = `${Math.round(+values[1])}₽`;
    }
  });
}

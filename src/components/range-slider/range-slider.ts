import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui/themes/base/slider.css';

const amount: HTMLInputElement | null = document.querySelector('.js-range-slider__amount');
const sliderOptions = {
  range: true,
  min: 0,
  max: 15500,
  values: [5000, 10000],
  slide: (_: any, ui: any) => {
    amount!.value = `${ui.values[0]}₽ - ${ui.values[1]}₽`;
  },
};

$(document).ready(() => {
  $('.js-range-slider__slider').slider(sliderOptions);
  amount!.value = `${sliderOptions.values[0]}₽ - ${sliderOptions.values[1]}₽`;
});

import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru';
import 'flatpickr/dist/flatpickr.min.css';
import adaptiveMonth from '../../ts/additional-components/adaptive-month';

flatpickr.localize(Russian);

flatpickr('.js-filter-date__input', {
  dateFormat: 'd.m',
  mode: 'range',
  prevArrow: 'arrow_back',
  nextArrow: 'arrow_forward',
  locale: {
    rangeSeparator: ' - ',
  },
});

const yearInput: HTMLInputElement | null = document.querySelector('.numInput');
const monthSelect: HTMLInputElement | null = document.querySelector('.flatpickr-monthDropdown-months');

const disableInputs = (objects: HTMLInputElement[]) => {
  for (let index = 0; index < objects.length; index += 1) {
    objects[index].setAttribute('disabled', 'disabled');
  }
};

disableInputs([yearInput!, monthSelect!]);

setInterval(() => adaptiveMonth(), 50);

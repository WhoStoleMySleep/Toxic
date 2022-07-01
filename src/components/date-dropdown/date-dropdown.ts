import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru';
import ShortcutButtonsPlugin from '../../ts/shortcut-buttons-flatpickr/shortcut-buttons-flatpickr';
import adaptiveMonth from '../../ts/additional-components/adaptive-month';
import { HTML } from '../../ts/types';

type Input = HTMLInputElement | null;

const dateDropdownContainer: HTML['Element'] = document.querySelector('.js-date-dropdown__container');
const startDateInput: Input = document.querySelector('.js-date-dropdown__start-date');
const endDateInput: Input = document.querySelector('.js-date-dropdown__end-date');

if (startDateInput && endDateInput && dateDropdownContainer) {
  flatpickr.localize(Russian);

  flatpickr(startDateInput, {
    dateFormat: 'd.m.Y',
    mode: 'range',
    prevArrow: 'arrow_back',
    nextArrow: 'arrow_forward',
    locale: {
      rangeSeparator: ' - ',
    },
    inline: true,
    minDate: 'today',
    appendTo: dateDropdownContainer,
    onChange: () => {
      const dates = startDateInput.value.split(' - ');
      const calendar: HTMLElement | null = document.querySelector('.flatpickr-calendar.inline');

      startDateInput.value = `${dates[0]}`;
      endDateInput.value = `${dates[1] ? dates[1] : ''}`;

      if (calendar && dates[1]) {
        calendar.style.display = 'none';
      }
    },
    plugins: [
      ShortcutButtonsPlugin({
        button: [
          {
            label: 'Очистить',
          },
          {
            label: 'Применить',
          },
        ],
        onClick: (index: number, fp) => {
          const calendar = fp;

          const days = document.querySelector('.js-to-book__number-days');
          const daysSumm = document.querySelector('.js-to-book__summing-days-summ');
          const totalSumm = document.querySelector('.js-to-book__total-summ');

          switch (index) {
            case 0:
              calendar.clear();
              calendar.calendarContainer.style.display = 'none';

              if (days && daysSumm && totalSumm) {
                days.innerHTML = '0 суток';
                daysSumm.innerHTML = '0₽';
                totalSumm.innerHTML = '0₽';
              }

              break;

            case 1:
              calendar.calendarContainer.style.display = 'none';
              break;

            default:
              break;
          }
        },
      }),
    ],
  });

  [startDateInput, endDateInput].forEach((element) => {
    const calendar: HTMLElement | null = document.querySelector('.flatpickr-calendar.inline');

    element.addEventListener('click', () => {
      if (calendar) {
        calendar.style.display = 'block';
      }
    });
  });
}

const yearInput: Input = document.querySelector('.numInput');
const monthSelect: Input = document.querySelector('.flatpickr-monthDropdown-months');

const disableInputs = (objects: HTMLInputElement[]) => {
  for (let index = 0; index < objects.length; index += 1) {
    objects[index].setAttribute('disabled', 'disabled');
  }
};

if (yearInput && monthSelect) {
  disableInputs([yearInput, monthSelect]);
}

setInterval(() => adaptiveMonth(), 50);

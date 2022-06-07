import buttonEvents from '../../ts/additional-components/button-events';
import variables from '../../ts/additional-components/dropdown-variables';
import '../date-dropdown/date-dropdown';
import Dropdown from '../dropdown/dropdown';

Dropdown('.dropdown', {
  setSelectionText: (
    itemCount: any,
    totalItems: number,
  ) => variables.firstVariable(itemCount, totalItems),
  customFunctionality: (selector: HTMLElement, itemCount: number[], totalItems: [number]) => buttonEvents(selector, itemCount, totalItems, 'Сколько гостей'),
  initialSelectionText: 'Сколько гостей',
});

const lastMonthDay = (year: number, month: number) => {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
};

const numericDelimiter = (variable: string) => {
  const variableElements = variable.toString().split('');

  for (let index = variableElements.length; index >= 0; index -= 1) {
    if (index % 3 === 0) {
      variableElements.splice(-index, 0, ' ');
    }
  }

  return variableElements.join('');
};

const rangeDaysCounter = (here: string, start: string, end: string): string => {
  const hereYear = here.split('.')[2];
  const [startDay, startMonth, startYear] = start.split('.');
  const [endDay, endMonth] = end.split('.');

  let summary = 0;

  if (+startMonth < +endMonth - 1) {
    summary += lastMonthDay(+startYear, +startMonth) - +startDay + +endDay;

    for (let index = 1; index < +endMonth - +startMonth; index += 1) {
      summary += lastMonthDay(+hereYear, +startMonth) + 1;
    }
  } else if (+startMonth < +endMonth) {
    summary = lastMonthDay(+startYear, +startMonth - 1) - +startDay + +endDay;
  } else {
    summary = +endDay - +startDay;
  }

  return `${summary}`;
};

const hereDate = new Date().toLocaleDateString();
const priceElement = document.querySelector('.js-to-book__headed-cost > div:nth-child(1)');
const price = +priceElement!.innerHTML.replace(/[^0-9]/g, '');
const startDateInput: HTMLInputElement | null = document.querySelector('.js-date-dropdown__start-date');
const endDateInput: HTMLInputElement | null = document.querySelector('.js-date-dropdown__end-date');

const daysSumming = () => {
  const numberOfDays = document.querySelector('.js-to-book__number-days');
  const daysSumm = document.querySelector('.js-to-book__summing-days-summ');
  const days = rangeDaysCounter(hereDate, startDateInput!.value, endDateInput!.value);
  const summ = +days * +price;

  numberOfDays!.innerHTML = `${days} суток`;
  daysSumm!.innerHTML = `${numericDelimiter(`${summ}`)}₽`;
};

const totalSumming = () => {
  const additionalServicesSumm = document.querySelector('.js-to-book__additional-services-summ')!.innerHTML.replace(/[^0-9]/g, '');
  const serviceChargeText = document.querySelector('.js-to-book__service-charge-text')!.innerHTML.replace(/[^0-9]/g, '');
  const totalSumm = document.querySelector('.js-to-book__total-summ');
  const days = rangeDaysCounter(hereDate, startDateInput!.value, endDateInput!.value);
  const summ = +days * +price - +serviceChargeText + +additionalServicesSumm;

  totalSumm!.innerHTML = `${numericDelimiter(`${summ}`)}₽`;
};

let prevDate: string | null = null;

setInterval(() => {
  if (endDateInput!.value && prevDate !== endDateInput!.value) {
    daysSumming();
    totalSumming();
    prevDate = endDateInput!.value;
  }
}, 250);

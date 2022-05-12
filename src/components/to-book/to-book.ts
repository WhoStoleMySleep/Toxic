import '../date-dropdown/date-dropdown';
import '../dropdown/dropdown';

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
const priceElement = document.querySelector('.to-book__headed-cost > div:nth-child(1)');
const price = +priceElement!.innerHTML.replace(/[^0-9]/g, '');
const additionalServicesSumm = document.querySelector('.to-book__additional-services-summ')!.innerHTML.replace(/[^0-9]/g, '');
const serviceChargeText = document.querySelector('.to-book__service-charge-text')!.innerHTML.replace(/[^0-9]/g, '');
const startDateInput: HTMLInputElement | null = document.querySelector('.js-date-dropdown__start-date');
const endDateInput: HTMLInputElement | null = document.querySelector('.js-date-dropdown__end-date');
const dateDropdownDatepicker = document.querySelector('.date-dropdown__datepicker');

const daysSumming = () => {
  const numberOfDays = document.querySelector('.to-book__number-days');
  const daysSumm = document.querySelector('.to-book__summing-days-summ');

  if (dateDropdownDatepicker!.classList.contains('_active')) {
    const days = rangeDaysCounter(hereDate, startDateInput!.value, endDateInput!.value);
    const summ = +days * +price;

    numberOfDays!.innerHTML = `${days} суток`;
    daysSumm!.innerHTML = `${numericDelimiter(`${summ}`)}₽`;
  }
};

const totalSumming = () => {
  const totalSumm = document.querySelector('.to-book__total-summ');

  if (dateDropdownDatepicker!.classList.contains('_active')) {
    const days = rangeDaysCounter(hereDate, startDateInput!.value, endDateInput!.value);
    const summ = +days * +price - +serviceChargeText + +additionalServicesSumm;

    totalSumm!.innerHTML = `${numericDelimiter(`${summ}`)}₽`;
  }
};

setInterval(() => {
  daysSumming();
  totalSumming();
}, 250);

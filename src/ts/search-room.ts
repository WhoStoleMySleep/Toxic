import '../components/filter-date-dropdown/filter-date-dropdown';
import '../components/range-slider/range-slider';
import Dropdown from '../components/dropdown/dropdown';
import '../components/card/card';
import '../components/pagination/pagination';
import variables from './additional-components/dropdown-variables';
import buttonEvents from './additional-components/button-events';

const dropdown = document.querySelectorAll('.dropdown');

Dropdown(dropdown[0], {
  setSelectionText: (
    itemCount: {},
    totalItems: number,
  ) => variables.firstVariable(itemCount, totalItems),
  customFunctionality: (selector: HTMLElement, itemCount: number[], totalItems: [number]) => buttonEvents(selector, itemCount, totalItems, 'Сколько гостей'),
  initialSelectionText: 'Сколько гостей',
});

Dropdown(dropdown[1], {
  setSelectionText: (
    itemCount: {},
  ) => variables.twoVariable(itemCount),
  customFunctionality: (selector: HTMLElement, itemCount: number[], totalItems: [number]) => buttonEvents(selector, itemCount, totalItems, 'Какие удобства'),
  initialSelectionText: 'Какие удобства',
});

const footer = document.querySelector('.footer');
const openAsideButton = document.querySelector('.search-room__open-aside-menu');
const aside = document.querySelector('.search-room__aside');
const numbers = document.querySelector('.search-room__numbers');

openAsideButton?.addEventListener('click', () => {
  aside?.classList.toggle('_active');
  openAsideButton?.classList.toggle('_active');
  numbers?.classList.toggle('_deactive');
  footer?.classList.toggle('_deactive');

  if (openAsideButton?.classList.contains('_active')) {
    openAsideButton.innerHTML = 'Закрыть';
  } else {
    openAsideButton.innerHTML = 'Параметры поиска';
  }
});

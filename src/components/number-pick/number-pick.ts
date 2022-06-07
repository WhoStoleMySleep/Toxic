import buttonEvents from '../../ts/additional-components/button-events';
import variables from '../../ts/additional-components/dropdown-variables';
import '../date-dropdown/date-dropdown';
import Dropdown from '../dropdown/dropdown';

Dropdown('.dropdown', {
  setSelectionText: (
    itemCount: {},
    totalItems: number,
  ) => variables.firstVariable(itemCount, totalItems),
  customFunctionality: (selector: HTMLElement, itemCount: number[], totalItems: [number]) => buttonEvents(selector, itemCount, totalItems, 'Сколько гостей'),
  initialSelectionText: 'Сколько гостей',
});

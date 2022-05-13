import 'item-quantity-dropdown/lib/item-quantity-dropdown.min';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';

$('.dropdown').iqDropdown({
  setSelectionText: (_itemCount: undefined, totalItems: number) => {
    if (totalItems) {
      const totalLastNumber = totalItems.toString().split('').pop() as string;
      const equalsZero = (totalItems === 0);

      if (equalsZero) {
        return 'Сколько гостей';
      }

      const equalsOne = (+totalLastNumber === 1 && !(totalItems >= 11 && totalItems <= 14));
      if (equalsOne) {
        return `${totalItems} гость`;
      }

      const twoToFour = (
        +totalLastNumber >= 2 && +totalLastNumber <= 4 && !(totalItems >= 11 && totalItems <= 14)
      );

      if (twoToFour) {
        return `${totalItems} гостя`;
      }

      const allTheRest = (
        (+totalLastNumber >= 5 && +totalLastNumber <= 9) || (totalItems >= 11 && totalItems <= 14)
      );

      if (allTheRest) {
        return `${totalItems} гостей`;
      }
    }

    return 'ошибка';
  },
});

const disabledAdd = () => {
  const counter = document.querySelectorAll('.iqdropdown-item-controls > .counter');
  const counterArr = [];

  for (let index = 0; index < counter.length; index += 1) {
    const indexCountString = counter[index].innerHTML.toString();
    counterArr.push(indexCountString === '0');
  }

  for (let index = 0; index < counterArr.length; index += 1) {
    const classDecrement = '.iqdropdown-item-controls > .button-decrement';
    const hereDecrement = document.querySelectorAll(classDecrement)[index];

    if (counterArr[index]) {
      hereDecrement.classList.add('_deactive');
    } else {
      hereDecrement.classList.remove('_deactive');
    }
  }
};

setInterval(disabledAdd, 50);

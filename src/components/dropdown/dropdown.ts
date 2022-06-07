const Dropdown = (selectors: HTMLElement | NodeListOf<Element> | string, optionss?: {}) => {
  const options = {
    setSelectionText: (itemCount: {}, totalItems: number) => (`${itemCount}, ${totalItems}`),
    onChange: (itemCount: {}, totalItems: number, selector: HTMLElement) => (`${itemCount}, ${totalItems}, ${selector}`),
    customFunctionality: (selector: HTMLElement, itemCount: number[], totalItems: [number]) => (`${selector}, ${itemCount}, ${totalItems}`),
    initialSelectionText: 'dropdown',
    cls: {
      selection: 'dropdown__selection',
      menu: 'dropdown__menu',
      option: 'dropdown__option',
    },
    ...optionss,
  };

  const selector: HTMLElement[] = [];

  const initialSelectionText = (selectorDropdown: HTMLElement, textFunction: string) => {
    const selection = selectorDropdown.childNodes[0] as HTMLElement;

    selection.innerHTML = `${textFunction}`;
  };

  const returnSelectionText = (
    itemCount: {},
    totalItems: number,
    selectorDropdown: HTMLElement,
  ) => {
    const selection = selectorDropdown.childNodes[0] as HTMLElement;

    selection.innerHTML = `${options.setSelectionText(itemCount, totalItems)}`;
  };

  const decrementButton = (
    index: number,
    totalItems: [number],
    counter: HTMLElement,
    itemCount: number[],
    dropdownIndex: number,
  ) => {
    if (itemCount[index] > 0) {
      itemCount[index] -= 1;
      totalItems[0] -= 1;

      counter.innerHTML = `${itemCount[index]}`;

      returnSelectionText(itemCount, totalItems[0], selector[dropdownIndex]);

      options.onChange(itemCount, totalItems[0], selector[dropdownIndex]);
    }
  };

  const incrementButton = (
    index: number,
    totalItems: [number],
    counter: HTMLElement,
    itemCount: number[],
    dropdownIndex: number,
  ) => {
    itemCount[index] += 1;
    totalItems[0] += 1;

    counter.innerHTML = `${itemCount[index]}`;

    returnSelectionText(itemCount, totalItems[0], selector[dropdownIndex]);

    options.onChange(itemCount, totalItems[0], selector[dropdownIndex]);
  };

  const openDropdown = (selectorDropdown: HTMLElement) => {
    const selection = selectorDropdown.childNodes[0] as HTMLElement;

    selection.addEventListener('click', () => {
      selectorDropdown.classList.toggle('_open');
    });
  };

  const initSelector = () => {
    if (typeof selectors === 'string') {
      const selectorElement: NodeListOf<HTMLElement> = document.querySelectorAll(`${selectors}`);

      if (selectorElement) {
        for (let index = 0; index < selectorElement.length; index += 1) {
          selector.push(selectorElement[index]);
        }
      }
    } else if (Array.from(selectors).length === 0) {
      selector.push(selectors);
    } else {
      const selectorsArray: Element[] = Array.from(selectors);

      if (selectorsArray) {
        for (let index = 0; index < selectorsArray.length; index += 1) {
          selector.push(selectorsArray[index]);
        }
      }
    }
  };

  const initial = () => {
    if (selectors) {
      initSelector();

      for (let dropdownIndex = 0; dropdownIndex < selector.length; dropdownIndex += 1) {
        const itemCount: number[] = [];
        const totalItems: [number] = [0];

        openDropdown(selector[dropdownIndex]);

        initialSelectionText(selector[dropdownIndex], options.initialSelectionText);

        options.customFunctionality(selector[dropdownIndex], itemCount, totalItems);

        const optionElements = selector[dropdownIndex]
          .childNodes[1].childNodes as unknown as HTMLElement[];

        for (let index = 0; index < optionElements.length; index += 1) {
          if (optionElements[index].className === options.cls.option) {
            const decrement = selector[dropdownIndex]
              .childNodes[1].childNodes[index].childNodes[1].childNodes[0];
            const counter = selector[dropdownIndex]
              .childNodes[1].childNodes[index].childNodes[1].childNodes[1] as HTMLElement;
            const increment = selector[dropdownIndex]
              .childNodes[1].childNodes[index].childNodes[1].childNodes[2];

            itemCount.push(+counter.innerHTML);
            totalItems[0] += +counter.innerHTML;

            decrement.addEventListener('click', () => decrementButton(index, totalItems, counter, itemCount, dropdownIndex));
            increment.addEventListener('click', () => incrementButton(index, totalItems, counter, itemCount, dropdownIndex));
          }
        }
      }
    }
  };

  initial();
};

export default Dropdown;

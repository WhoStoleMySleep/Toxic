const buttonEvents = (
  selector: HTMLElement,
  itemCount: number[],
  totalItems: [number],
  initialText: string,
) => {
  const buttonContainer = selector
    .childNodes[1].childNodes[selector.childNodes[1].childNodes.length - 1];
  const selection = selector.childNodes[0] as HTMLElement;
  const buttonClear = buttonContainer.childNodes[0];
  const buttonSubmit = buttonContainer.childNodes[1];

  buttonClear.addEventListener('click', () => {
    for (let index = 0; index < itemCount.length; index += 1) {
      const counter = selector
        .childNodes[1].childNodes[index].childNodes[1].childNodes[1] as HTMLElement;

      itemCount[index] = 0;
      counter.innerHTML = '0';
      selection.innerHTML = initialText;
    }

    totalItems[0] = 0;

    selector.classList.remove('_open');
  });

  buttonSubmit.addEventListener('click', () => {
    selector.classList.remove('_open');
  });
};

export default buttonEvents;

let monthN: string | null = null;

const adaptiveMonth = () => {
  const monthSelect: HTMLInputElement | null = document.querySelector('.flatpickr-monthDropdown-months');
  const monthIndex = monthSelect!.value;
  const months = document.querySelectorAll('.flatpickr-monthDropdown-month') as unknown as HTMLInputElement[];
  const monthsArr = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  if (monthN !== monthIndex) {
    for (let index = 0; index < monthsArr.length; index += 1) {
      if (months[index].value !== monthIndex) {
        months![index].innerHTML = '';
      } else {
        months[index].innerHTML = monthsArr[+monthIndex];
      }
    }

    monthN = monthIndex;
  }
};

export default adaptiveMonth;

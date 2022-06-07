let monthN: number | null = null;

const adaptiveMonth = () => {
  const monthSelect: HTMLInputElement | null = document.querySelector('.flatpickr-monthDropdown-months');
  const monthIndex: number = +monthSelect!.value;
  const monthsWidthArr = [
    '73px',
    '88px',
    '51px',
    '74px',
    '43px',
    '56px',
    '55px',
    '65px',
    '94px',
    '84px',
    '75px',
    '85px',
  ];

  const editMonth = monthN !== monthIndex;

  if (monthSelect && editMonth) {
    monthSelect.style.width = monthsWidthArr[monthIndex];
    monthN = monthIndex;
  }
};

export default adaptiveMonth;

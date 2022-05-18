import '../components/header/header';
import '../components/filter-date-dropdown/filter-date-dropdown';
import '../components/range-slider/range-slider';
import '../components/dropdown/dropdown';
import '../components/card/card';
import 'paginationjs';

const contentIdArr = [];

for (let i = 1; i < 135; i++) {
  contentIdArr.push(i);
}

let pageRange = window.screen.width;
if (pageRange > 360) {
  pageRange = 1;
} else if (pageRange <= 360) {
  pageRange = 0;
}
$('.pagination').pagination({
  dataSource: contentIdArr,
  pageRange,
  pageSize: 12,
  autoHidePrevious: true,
  autoHideNext: true,
  prevText: 'arrow_forward',
  nextText: 'arrow_forward',
  showNavigator: true,
  formatNavigator: '1 – 12 из 100+ вариантов аренды',
});

// $('.dropdown1').dropdown();
// $('.dropdown2').dropdown({
//   type: 1,
// });

document.querySelector('.aside__open-menu').addEventListener('click', () => {
  document.querySelector('aside').classList.toggle('_active');
  document.querySelector('.aside__open-menu').classList.toggle('_active');
  document.querySelector('.header').classList.toggle('_deactive');
  document.querySelector('.main__numbers').classList.toggle('_deactive');
});

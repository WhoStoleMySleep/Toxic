import Swiper, { Navigation, Pagination } from 'swiper';

const sliders: NodeListOf<Element> = document.querySelectorAll('.card__slider');
const slidersArray = Array.from(sliders) as HTMLElement[];

for (let index = 0; index < slidersArray.length; index += 1) {
  const swiper = new Swiper(slidersArray[index], {
    modules: [Navigation, Pagination],

    loop: true,
    allowTouchMove: false,

    pagination: {
      el: '.swiper-pagination',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

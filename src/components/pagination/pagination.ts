import { HTML } from '../../ts/types';

const hereWidth = document.documentElement.clientWidth;
const pagination: HTML['Element'] = document.querySelector('.pagination');
const paginationPages: HTML['ElementArr'] = Array.from(document.querySelectorAll('.pagination__page'));
const herePage = document.querySelector('.pagination__page.active')?.innerHTML;
const dots: HTML['ElementArr'] = Array.from(document.querySelectorAll('.pagination__page-dots'));
const prevPageButton: HTML['Element'] = document.querySelector('.pagination__prev');
const nextPageButton: HTML['Element'] = document.querySelector('.pagination__next');

const presence = hereWidth && pagination && herePage && prevPageButton && nextPageButton && dots;

if (presence) {
  if (+herePage > 1) {
    prevPageButton.style.display = 'block';
  }
  if (+herePage < paginationPages.length - 4) {
    nextPageButton.style.display = 'block';
  }

  if (+herePage <= 12 && paginationPages.length - 4 >= 6) {
    dots[1].style.display = 'block';

    if (+herePage >= 5) {
      dots[0].style.display = 'block';
    }

    if (+herePage <= 4) {
      if (+herePage === 1) {
        paginationPages[4].style.display = 'block';
      }

      for (let index = 2; index < +herePage + 2; index += 1) {
        paginationPages[index + 1].style.display = 'block';
      }
    } else if (+herePage >= 12) {
      for (let index = +herePage - 1; index < 15; index += 1) {
        if (!['...', 'arrow_back', 'arrow_forward'].includes(paginationPages[index + 1].innerHTML)) {
          paginationPages[index + 1].style.display = 'block';
        }
      }
    } else {
      for (let index = +herePage - 1; index < +herePage + 2; index += 1) {
        if (!['...', 'arrow_back', 'arrow_forward'].includes(paginationPages[index + 1].innerHTML)) {
          paginationPages[index + 1].style.display = 'block';
        }
      }
    }
    if (+herePage === 15) {
      for (let index = 13; index < 15; index += 1) {
        paginationPages[index + 1].style.display = 'block';
      }
    } else {
      dots[1].style.order = `${+herePage + 5}`;
    }
  } else {
    for (let index = 2; index < paginationPages.length - 2; index += 1) {
      paginationPages[index].style.display = 'block';
    }
  }
}

const burgerButton = document.querySelector('.js-header__burger');
const headerLinks = document.querySelector('.js-header__link-list');
const body = document.querySelector('body');

if (burgerButton && headerLinks) {
  burgerButton!.addEventListener('click', () => {
    headerLinks!.classList.toggle('_active');
    body!.classList.toggle('_blockSwipe');
  });
}

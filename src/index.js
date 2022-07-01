// import images
import './img/logo.svg';
import './img/burger.webp';

import './ts/scroll';

import './components/header/header.ts';

if (document.querySelector('.index')) {
  import('./ts/index.ts');
  import('./scss/index.scss');
  import('./img/bg1.webp');
}

if (document.querySelector('.search-room')) {
  import('./ts/search-room.ts');
  import('./scss/search-room.scss');
  import('./img/done.webp');
  import('./img/bg-cards-one.webp');
  import('./img/bg-cards-two.webp');
  import('./img/bg-cards-three.webp');
}

if (document.querySelector('.room-details')) {
  import('./ts/room-details.ts');
  import('./scss/room-details.scss');
  import('./img/face.webp');
  import('./img/face2.webp');
  import('./img/bg-cards-one.webp');
  import('./img/bg-cards-two.webp');
  import('./img/bg-cards-three.webp');
}

if (document.querySelector('.registration')) {
  import('./scss/registration.scss');
  import('./img/reg-sign-bg.webp');
}

if (document.querySelector('.sign-in')) {
  import('./scss/sign-in.scss');
  import('./img/reg-sign-bg.webp');
}

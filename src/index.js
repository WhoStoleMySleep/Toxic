// import images
import './img/bg1.jpg';
import './img/logo.png';
import './img/burger.png';
import './img/bg-cards-one.jpg';
import './img/bg-cards-two.jpg';
import './img/bg-cards-three.jpg';
import './img/dot.png';
import './img/reg-sign-bg.jpg';

import './ts/scroll';

import('./components/header/header.ts');

async function index() {
  await import('./ts/index.ts');
  await import('./scss/index.scss');
}
if ($('.index').length) {
  index();
}

async function searchRoom() {
  await import('./ts/search-room.ts');
  await import('./scss/search-room.scss');
  await import('./img/done.png');
}
if ($('.search-room').length) {
  searchRoom();
}

async function roomDetails() {
  await import('./ts/room-details.ts');
  await import('./scss/room-details.scss');
  await import('./img/face.png');
  await import('./img/face2.png');
}
if ($('.room-details').length) {
  roomDetails();
}

async function registration() {
  await import('./scss/registration.scss');
}
if ($('.registration').length) {
  registration();
}

async function signIn() {
  await import('./scss/sign-in.scss');
}
if ($('.sign-in').length) {
  signIn();
}

function component() {
  return;
}
document.body.appendChild(component());

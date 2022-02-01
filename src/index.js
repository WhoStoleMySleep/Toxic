
import * as _ from 'lodash';
import $ from 'jquery';

// import 'slick-carousel';

import('./components/header/header.scss');
import('./components/footer/footer.scss');
import('./components/header/header.js');

async function index() {
	await import('./css/index.scss');
	await import ('./js/index.js');
	await import('jquery-ui/themes/base/datepicker.css');
}
async function searchRoom() {
	await import('./css/search-room.scss');
	await import('./js/search-room.js');
	await import('./components/range-slider/range-slider.scss');
	await import('jquery-ui/themes/base/slider.css');
}
async function roomDetails() {
	await import('./css/room-details.scss');
	await import('./js/room-details.js');
	await import('jquery-ui/themes/base/datepicker.css');
}
async function registration() {
	await import('./css/registration.scss');
}
async function signIn() {
	await import('./css/sign-in.scss');
}


if($('#index').length){
	index()
}
if($('#search-room').length){
	searchRoom()
}
if($('#room-details').length){
	roomDetails()
}
if($('#registration').length){
	registration()
}
if($('#sign-in').length){
	signIn()
}

function component() {
  return;
}
document.body.appendChild(component());
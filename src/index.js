import * as _ from 'lodash';
import $ from 'jquery';

// import 'slick-carousel';


import('./components/header/header.ts');


async function index() {
	await import('./js/index.ts');
	await import('jquery-ui/themes/base/datepicker.css');
	await import('./css/index.scss');
}
if ($('#index').length) {
	index();
}

async function searchRoom() {
	await import('./js/search-room.js');
	await import('./components/range-slider/range-slider.scss');
	await import('jquery-ui/themes/base/slider.css');
	await import('./css/search-room.scss');
}
if($('#search-room').length){
	searchRoom()
}

async function roomDetails() {
	await import('./js/room-details.ts');
	await import('jquery-ui/themes/base/datepicker.css');
	await import('./css/room-details.scss');
}
if($('#room-details').length){
	roomDetails()
}

async function registration() {
	await import('./css/registration.scss');
}
if($('#registration').length){
	registration()
}

async function signIn() {
	await import('./css/sign-in.scss');
}
if($('#sign-in').length){
	signIn()
}

// function component() {
// 	return;
// }
// document.body.appendChild(component());

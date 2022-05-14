import * as _ from 'lodash';
import $ from 'jquery';

import './favicons/favicons';

// import 'slick-carousel';

import './ts/scroll'

import('./components/header/header.ts');


async function index() {
	await import('./ts/index.ts');
	await import('jquery-ui/themes/base/datepicker.css');
	await import('./scss/index.scss');
}
if ($('.index').length) {
	index();
}

async function searchRoom() {
	await import('./ts/search-room.ts');
	await import('./components/range-slider/range-slider.scss');
	await import('jquery-ui/themes/base/slider.css');
	await import('./scss/search-room.scss');
}
if($('.search-room').length){
	searchRoom()
}

async function roomDetails() {
	await import('./ts/room-details.ts');
	await import('jquery-ui/themes/base/datepicker.css');
	await import('./scss/room-details.scss');
}
if($('.room-details').length){
	roomDetails()
}

async function registration() {
	await import('./scss/registration.scss');
}
if($('.registration').length){
	registration()
}

async function signIn() {
	await import('./scss/sign-in.scss');
}
if($('.sign-in').length){
	signIn()
}

function component() {
	return;
}
document.body.appendChild(component());

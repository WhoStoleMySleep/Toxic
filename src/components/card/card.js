$(document).ready(function() {
	$('.card__slider').slick({
		dots: true
	});

	let sliders = document.querySelectorAll('.card__slider')
	for(let i = 0; i !== sliders.length; i++){
		document.querySelectorAll('.card__slider .slick-next')[i].innerHTML = 'expand_more';
		document.querySelectorAll('.card__slider .slick-prev')[i].innerHTML = 'expand_more';
	}
})
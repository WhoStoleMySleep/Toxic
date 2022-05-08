import compareElementTypes from '../../js/helper-modules/compareElementTypes';

(function () {
	const burgerButton = document.querySelector('.js-header__menu-burger');
	const headerLinks = document.querySelector('.js-header__menu-links');
	const body = document.body;
	
	if (!compareElementTypes(null, burgerButton, headerLinks)) {
		burgerButton!.addEventListener('click', function() {
			headerLinks!.classList.toggle('_active');
			body!.classList.toggle('_blockSwipe');
		});
	}
})();

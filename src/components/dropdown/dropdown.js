import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';

$(document).ready(() => {
	$('.dropdown').iqDropdown({
		setSelectionText: (itemCount, totalItems) => { 
			let totalLastNumber = +totalItems.toString().split('').pop()
			let equalsZero = (totalItems === 0)

			if(equalsZero){
				return 'Сколько гостей'
			}
			const equalsOne = (totalLastNumber === 1 && !(totalItems >= 11 && totalItems <= 14));
			if(equalsOne) {
				return `${totalItems} гость`
			}
			const twoToFour = (totalLastNumber >= 2 && totalLastNumber <= 4 && !(totalItems >= 11 && totalItems <= 14))
			if(twoToFour) {
				return `${totalItems} гостя`
			}
			const allTheRest = (totalLastNumber >= 5 && totalLastNumber <= 9 || totalItems >= 11 && totalItems <= 14)
			if(allTheRest) {
				return `${totalItems} гостей`
			}
		}, 
	})
});
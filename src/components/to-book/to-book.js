import '../date-dropdown/date-dropdown'
import '../dropdown/dropdown'

// first programm
const dateSumming = () => {
	const startDate = document.querySelector('#start-date').value
	let startDateValue = '';
	let dayStartDateValue = '';
	let monthStartDateValue = '';
	let yearStartDateValue = '';

	const endDate = document.querySelector('#end-date').value
	let endDateValue = '';
	let dayEndDateValue = '';
	let monthEndDateValue = '';
	let yearEndDateValue = '';

	if(startDate.length !== 0 && endDate.length !== 0){
		for(let i = 0; i !== startDate.length; i++){
			if(i >= 0 && i < 2){
				dayStartDateValue = dayStartDateValue + startDate[i]
			}
			if(i >= 3 && i < 5){
				monthStartDateValue = (monthStartDateValue + startDate[i])
			}
			if(i >= 6){
				yearStartDateValue = (yearStartDateValue + startDate[i])
			}
		}
		monthStartDateValue *= 30;
		yearStartDateValue *= 360;
		startDateValue = Number(dayStartDateValue) + Number(monthStartDateValue) + Number(yearStartDateValue);

		for(let i = 0; i !== startDate.length; i++){
			if(i >= 0 && i < 2){
				dayEndDateValue = dayEndDateValue + endDate[i]
			}
			if(i >= 3 && i < 5){
				monthEndDateValue = (monthEndDateValue + endDate[i])
			}
			if(i >= 6){
				yearEndDateValue = (yearEndDateValue + endDate[i])
			}
		}
		monthEndDateValue *= 30;
		yearEndDateValue *= 360;
		endDateValue = Number(dayEndDateValue) + Number(monthEndDateValue) + Number(yearEndDateValue);
		let summDate = endDateValue - startDateValue;

		if(monthStartDateValue !== monthEndDateValue){
			summDate = endDateValue - startDateValue + 1;
		}

		document.querySelector('.to-book__days').innerHTML = summDate + ' суток';
		summing()
	}
	if(startDate.length === 0 && endDate.length === 0){
		document.querySelector('.to-book__days').innerHTML = '0 суток';
		document.querySelector('#daysSumm').innerHTML = '0₽'
		document.querySelector('#totalTotal').innerHTML = '0₽'
	}
}
setInterval(dateSumming, 1000)

// two programm
const summing = () => {
	const toBookPrice = document.querySelector('.to-book__price').innerHTML;
	let toBookPriceValue = '';

	const toBookDays = document.querySelector('.to-book__days').innerHTML;
	let toBookDaysValue = '';

	const toBookServiceDiscount = document.querySelector('.to-book__service-charge-text').innerHTML;
	let toBookServiceDiscountValue = '';

	const totalTotal = document.querySelector('#totalTotal')
	let totalTotalSumm;


	for(let i = 0; i !== toBookPrice.length; i++){
		if(toBookPrice[i] !== ' ' && toBookPrice[i] !== '₽'){
			toBookPriceValue = toBookPriceValue + toBookPrice[i];
		}
	}
	for(let i = 0; toBookDays[i] !== ' '; i++){
		toBookDaysValue = toBookDaysValue + toBookDays[i];
	}
	for(let i = 23; i !== 28; i++){
		if(toBookServiceDiscount[i] !== ' '){
			toBookServiceDiscountValue = toBookServiceDiscountValue + toBookServiceDiscount[i];
		}
	}

	document.querySelector('#daysSumm').innerHTML = (toBookPriceValue * toBookDaysValue) + '₽'

	totalTotalSumm = (toBookPriceValue * toBookDaysValue) - toBookServiceDiscountValue + 300

	if(totalTotalSumm > 0){
		totalTotal.innerHTML = totalTotalSumm + '₽'
	}
}


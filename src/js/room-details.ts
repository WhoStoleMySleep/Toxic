import '../components/comments/comments'
import '../components/to-book/to-book'

import Chart from 'chart.js';

const ctx = $(".js-room-details__bagel-canvas").get(0).getContext("2d");

const ctx: CanvasRenderingContext2D = $(".js-room-details__bagel-canvas").get(0).getContext("2d");

const createLinearGradient = (context: any, colorsArray: Array<string[]>) => {
	const gradientArray = []

	for(let index = 0; index < colorsArray.length; index += 1) {
		if(colorsArray[index].length > 1) {
			const gradient = context.createLinearGradient(0, 0, 0, 180);
	
			gradient.addColorStop(0.0, colorsArray[index][0])
			gradient.addColorStop(1.0, colorsArray[index][1])
			
			gradientArray.push(gradient)

		} else {
			gradientArray.push(colorsArray[index][0])

		}
	}

	return gradientArray
}

const backgroundColor: Array<string[]> =  [
	['#BC9CFF', '#8BA4F9'],
	['#6FCF97', '#66D2EA'],
	['#FFE39C', '#FFBA9C'],
	['#919191', '#3D4975'],
]

console.log(ctx);


const chartData = {
	labels: [
		'Великолепно',
		'Хорошо',
		'Удовлетаврительно',
		'Разочарован',
	],
	datasets: [{
		data: [250, 250, 500, 0],
		backgroundColor: createLinearGradient(ctx, backgroundColor),
	}],
}

const chartOption = {
	cutoutPercentage: 90,
	legend: {
		display: false,
	},
	tooltips: {
		enabled: false,
	},
	hover: {
		mode: 'point',
	},
	onHover(e: object, data: string[]) {
		let hovered: null | string = null;
		
		if (!hovered) {
			[hovered] = data;
			
			const legendElements = document.querySelectorAll('.js-room-details__bagel-legend > ul > li')
			const legend = document.querySelector('.js-room-details__bagel-legend') as HTMLElement;
			const legendTextList = legend!.innerText.split('\n')
			const hoveredIndex = legendTextList.indexOf(hovered?._view.label)

			for(let index = 0; index < 4; index += 1){
				legendElements[index].style.transform = 'scale(1)'
			}

			legendElements[hoveredIndex].style.transform = 'scale(1.1)'
		}
	},
}

$(document).ready(() => {
	const chart = new Chart(ctx, {
		type: 'doughnut',
		data: chartData,
		options: chartOption
	});
	$(".js-room-details__bagel-legend").html(chart.generateLegend());

	const legendElems = document.querySelectorAll(".js-room-details__bagel-legend li span");
	const colorsArr = [
		'#BC9CFF 0%, #8BA4F9 100%',
		'#6FCF97 0%, #66D2EA 100%',
		'#FFE39C 0%, #FFBA9C 100%',
		'#919191 0%, #3D4975 100%',
	]
	
	for(let i = 0; i < legendElems.length; i += 1) {
		legendElems[i].style.background = `linear-gradient(180deg, ${ colorsArr[i] })`
	}
})
import '../components/comments/comments'
// import '../components/to-book/to-book'
import 'slick-carousel/slick/slick.min.js'

import Chart from 'chart.js';

$(document).ready(function(){
  $('.room-details__images-carousel').slick();

	$('.room-details__images-carousel .slick-next').html('arrow_forward_ios')
	$('.room-details__images-carousel .slick-prev').html('arrow_back_ios')
});

const ctx = $("#graph").get(0).getContext("2d");

const gradient1 = ctx.createLinearGradient(0, 0, 0, 180);
gradient1.addColorStop(0.0, '#BC9CFF');
gradient1.addColorStop(1.0, '#8BA4F9');
const gradient2 = ctx.createLinearGradient(0, 0, 0, 180);
gradient2.addColorStop(0.0, '#6FCF97');
gradient2.addColorStop(1.0, '#66D2EA');
const gradient3 = ctx.createLinearGradient(0, 0, 0, 180);
gradient3.addColorStop(0.0, '#FFE39C');
gradient3.addColorStop(1.0, '#FFBA9C');
const gradient4 = ctx.createLinearGradient(0, 0, 0, 180);
gradient4.addColorStop(0.0, '#919191');
gradient4.addColorStop(1.0, '#3D4975');

const chartData = {
	labels: [
		'Великолепно',
		'Хорошо',
		'Удовлетаврительно',
		'Разочарован',
	],
	datasets: [{
		data: [250, 250, 500, 0],
		backgroundColor: [
			gradient1,
			gradient2,
			gradient3,
			gradient4,
		],
		hoverOffset: 4,
		cutout: '90%',
	}]
}

const chartOption = {
	legend: {
		display: false,
	},
}

const chart = new Chart(ctx, {
	type: 'doughnut',
	data: chartData,
	options: chartOption
});
$("#legend").html(chart.generateLegend());
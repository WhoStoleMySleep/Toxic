import '../components/comments/comments'
import '../components//to-book/to-book'
import {
  Chart,
  ArcElement,
  BarElement,
  DoughnutController,
  Legend,
  Tooltip,
} from 'chart.js';

Chart.register(
  ArcElement,
  BarElement,
  DoughnutController,
  Legend,
  Tooltip,
);

let ctx = document.querySelector("#graph").getContext("2d");


let gradient1 = ctx.createLinearGradient(0, 0, 0, 180)
	gradient1.addColorStop(0.0, '#BC9CFF')
	gradient1.addColorStop(1.0, '#8BA4F9');
let gradient2 = ctx.createLinearGradient(0, 0, 0, 180)
  gradient2.addColorStop(0.0, '#6FCF97')
  gradient2.addColorStop(1.0, '#66D2EA');
let gradient3 = ctx.createLinearGradient(0, 0, 0, 180)
  gradient3.addColorStop(0.0, '#FFE39C')
  gradient3.addColorStop(1.0, '#FFBA9C');
let gradient4 = ctx.createLinearGradient(0, 0, 0, 180)
  gradient4.addColorStop(0.0, '#919191')
  gradient4.addColorStop(1.0, '#3D4975');

new Chart(ctx, {
  type: 'doughnut',
  data: {
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
  },
  options: {
  	maintainAspectRatio:false,
	  plugins: {
	    legend: {
	      position: 'right',
	      labels: {
		      boxWidth:10,
		      boxHeight:10,
		      usePointStyle:true
	      },
	    },
	  },
  }
});



import '../components/comments/comments';
import '../components/to-book/to-book';
import Chartist from 'chartist/dist/chartist';
// import 'chartist/dist/scss/chartist.scss'; problem here problem here problem here
// import 'chartist/dist/scss/settings/_chartist-settings.scss'; problem here problem here

const bagelCanvas: HTMLElement | null = document.querySelector('.js-room-details__bagel-canvas');

Chartist.Pie(bagelCanvas, {
  series: [65, 65, 130, 0],
}, {
  donut: true,
  donutWidth: 5,
  showLabel: false,
  chartPadding: 0,
});

const addMarginFromDonut = (arcs: NodeListOf<SVGPathElement>) => {
  for (let index = 0; index < arcs.length; index += 1) {
    const rounding = Math.round(arcs[index].getTotalLength()) > 0;
    const allArcs = arcs;

    if (rounding) {
      allArcs[index].style.strokeDasharray = `${allArcs[index].getTotalLength() - 2} 2px`;
    } else {
      allArcs[index].style.display = 'none';
    }
  }
};

const findInterval = setInterval(() => {
  const arcs: NodeListOf<SVGPathElement> = document.querySelectorAll('.ct-slice-donut');

  if (arcs) {
    addMarginFromDonut(arcs);

    clearInterval(findInterval);
  }
}, 100);

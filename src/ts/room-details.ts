import '../components/comments/comments';
import '../components/to-book/to-book';
import { Chart } from 'chart.js';
import { HTML, Canvas } from './types';

class Bagel {
  private context: CanvasRenderingContext2D;

  private backgroundColorArray: string[][];

  constructor(context: CanvasRenderingContext2D, backgroundColorArray: string[][]) {
    this.context = context;
    this.backgroundColorArray = backgroundColorArray;
  }

  createChart(enable: boolean = false) {
    if (enable) {
      const chart = new Chart(this.context, {
        type: 'doughnut',
        data: this.chartData(),
        options: {
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
          onHover: (_: object, data: string[]) => {
            Bagel.onHoverChartLines(data);
          },
        },
      });

      document.querySelector('.js-room-details__bagel-legend')!.innerHTML = `${chart.generateLegend()}`;

      this.addLegendsColors();
    }
  }

  private chartData() {
    const labels = [
      'Великолепно',
      'Хорошо',
      'Удовлетворительно',
      'Разочарован',
    ];
    const datasets = [{
      data: [250, 250, 500, 0],
      backgroundColor: Bagel.createLinearGradient(this.context, this.backgroundColorArray),
    }];

    return { labels, datasets };
  }

  private addLegendsColors() {
    const legendItems = document.querySelectorAll('.js-room-details__bagel-legend li span') as unknown as HTMLElement[];

    for (let index: number | string = 0; index < legendItems.length; index += 1) {
      if (this.backgroundColorArray[index].length > 1) {
        const linearGradientString = `
        linear-gradient(
            180deg, 
            ${this.backgroundColorArray[index][0]} 0%, 
            ${this.backgroundColorArray[index][1]} 100%
          )
        `;

        legendItems[index].style.background = linearGradientString;
      } else {
        legendItems[index].style.background = [this.backgroundColorArray[index]].toString();
      }
    }
  }

  private static createLinearGradient(context: any, colorsArray: string[][]) {
    const gradientArray = [];

    for (let index = 0; index < colorsArray.length; index += 1) {
      if (colorsArray[index].length > 1) {
        const gradient = context.createLinearGradient(0, 0, 0, 180);

        gradient.addColorStop(0.0, colorsArray[index][0]);
        gradient.addColorStop(1.0, colorsArray[index][1]);

        gradientArray.push(gradient);
      } else {
        gradientArray.push(colorsArray[index][0]);
      }
    }

    return gradientArray;
  }

  private static onHoverChartLines(data: string[]) {
    let hovered: null | string = null;

    if (!hovered) {
      [hovered] = data;

      const legendElements = document.querySelectorAll('.js-room-details__bagel-legend > ul > li') as unknown as HTMLElement[];
      const legend = document.querySelector('.js-room-details__bagel-legend') as HTMLElement;
      const legendTextList = legend!.innerText.split('\n');
      /* eslint no-underscore-dangle: ["error", { "allow": ["_view"] }] */
      const hoveredIndex = legendTextList.indexOf(hovered?._view.label);

      for (let index = 0; index < 4; index += 1) {
        legendElements[index].style.transform = 'scale(1)';
      }

      legendElements[hoveredIndex].style.transform = 'scale(1.1)';
    }
  }
}

const bagelCanvas: HTML['Canvas'] = document.querySelector('.js-room-details__bagel-canvas');
const backgroundColor: Array<string[]> = [
  ['#BC9CFF', '#8BA4F9'],
  ['#6FCF97', '#66D2EA'],
  ['#FFE39C', '#FFBA9C'],
  ['#919191', '#3D4975'],
];

if (bagelCanvas) {
  const ctx: Canvas['RenderContext2d'] = bagelCanvas.getContext('2d');

  const bagel = new Bagel(ctx!, backgroundColor);

  bagel.createChart(true);
}

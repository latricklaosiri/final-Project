var ctx = document.getElementById('myChart')?.getContext('2d');

var data = [
  {
    x: '01.12.2019',
    y: 19
  },
  {
    x: '19.03.2020',
    y: 29
  },
  {
    x: '01.08.2021',
    y: 51
  },
  {
    x: '11.01.2022',
    y: 56
  }
];

const totalDuration = 2000;
const delayBetweenPoints = totalDuration / data.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

var animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
}

config = {
  type: 'line',
  data: {
    //labels: labels,
    datasets: [
      {
        label: 'Price History',
        data: data,
        fill: false,
        borderColor: '#FF00FF',
        cubicInterpolationMode: 'monotone',
        tension: 0.5,
      },
    ],
  },
  options: {
    animation: animation,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    plugins: {
      legend: false
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          parser: 'dd.mm.yyyy'
        },
      },
    }
  },
};

const chart = new Chart(ctx, config);
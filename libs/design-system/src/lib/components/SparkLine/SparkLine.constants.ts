import { Options } from 'highcharts';

export const SPARKLINE_CONSTANTS = {
  DIMENSIONS: {
    DEFAULT_WIDTH: 88,
    DEFAULT_HEIGHT: 44,
  },
  COLORS: {
    POSITIVE: '#16883C',
    NEGATIVE: '#DD3636',
  },
};
export const defaultOptions: Options = {
  chart: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    type: 'area',
    margin: [2, 0, 2, 0],
    style: {
      overflow: 'visible',
    },
  },
  title: {
    text: '',
  },
  credits: {
    enabled: false,
  },
  xAxis: {
    visible: false,
  },
  yAxis: {
    visible: false,
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  plotOptions: {
    series: {
      animation: false,
      lineWidth: 2,
      shadow: false,
      states: {
        hover: {
          enabled: false,
          lineWidth: 1,
        },
      },
      marker: {
        enabled: false,
      },
    },
  },
  series: [
    {
      data: [],
      type: 'area',
    },
  ],
};

import Highcharts from 'highcharts';
import 'highcharts/highcharts-more'; 
import HighchartsReact from 'highcharts-react-official';
import { ReportCardBase } from '../../ReportCardBase';

const categories = [
  'ارزش معاملات',
  'خرید حقیقی',
  'فروش حقیقی',
  'خرید حقوقی',
  'فروش حقوقی',
];

const data = [31.2, 31.2, 31.2, 31.2, 31.2];

const options: Highcharts.Options = {
  chart: {
    polar: true,
    type: 'line',
  },
  title: {
    text: '',
  },
  pane: {
    size: '80%',
  },
  xAxis: {
    categories,
    tickmarkPlacement: 'on',
    lineWidth: 0,
  },
  yAxis: {
    gridLineInterpolation: 'polygon',
    lineWidth: 0,
    min: 0,
    max: 40,
    tickInterval: 10,
  },

  series: [
    {
      name: 'آخرین روز معاملاتی',
      data,
      pointPlacement: 'on',
      type: 'line',
      color: '#1976d2',
    },
  ],
  legend: {
    enabled: false,
  },
};

export const Report_13_1 = () => {
  return (
    <ReportCardBase
      title="مقایسه معاملات امروز بازار بورس با توزیع تاریخی - شش ماه گذشته"
      popupInfoItems={[]}
      settingOptions={[]}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ReportCardBase>
  );
};

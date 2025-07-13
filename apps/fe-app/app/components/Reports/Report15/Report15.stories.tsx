import { Meta, StoryObj } from '@storybook/react';
import { Report15 } from './Report15';

const meta: Meta<typeof Report15> = {
  component: Report15,
};

export default meta;

type Story = StoryObj<typeof Report15>;

// Generate random scatter data that loosely fits the regression line
const generateScatterData = (
  count: number,
  beta: number,
  intercept: number,
  noise: number,
): [number, number][] => {
  return Array.from({ length: count }, () => {
    const x = Math.random() * 10 - 5; // X values from -5 to 5
    const idealY = beta * x + intercept;
    const y = idealY + (Math.random() - 0.5) * noise;
    return [parseFloat(x.toFixed(2)), parseFloat(y.toFixed(2))];
  });
};

const scatterData = generateScatterData(80, 1.2, 2.3, 8);
const graphData = scatterData.map(([x, y]) => ({
  Items: { x, y },
}));
export const Default: Story = {
  args: {
    data: {
      beta: 0.5639137427427016,
      betaAdjusted: 0.7092758284951344,
      yIntersect: 0.0005968202688624972,
      rSquared: 0.7895298008979341,
      pValue: 0.03495470806292882,
      graphData: [
        {
          x: 0.0028714436248682826,
          y: -0.0022112648749482555,
        },
        {
          x: 0.005599481642981604,
          y: 0.0006827049821708968,
        },
        {
          x: -0.0025425241518026234,
          y: -0.008680182000430336,
        },
        {
          x: -0.01067614105076623,
          y: -0.014238068768363376,
        },
        {
          x: -0.013522277566254749,
          y: -0.0016379752477773213,
        },
        {
          x: 0.00436944874283312,
          y: 0.0036336642451203736,
        },
        {
          x: 0.00033841700990760326,
          y: -0.002639674984992711,
        },
        {
          x: -0.013193798380599241,
          y: -0.004102996772954077,
        },
        {
          x: -0.023758722884066275,
          y: -0.012133067127131449,
        },
        {
          x: -0.010645966176878293,
          y: -0.006377289747448401,
        },
        {
          x: -0.04436847316407928,
          y: -0.031129057085055853,
        },
        {
          x: -0.03923935567111076,
          y: -0.030287985519869044,
        },
        {
          x: -0.0015260419051107144,
          y: -0.0013048299186382958,
        },
        {
          x: -0.00459021738576676,
          y: -0.001628774230213762,
        },
        {
          x: -0.0021086464741588446,
          y: -0.001522864981441,
        },
        {
          x: 0,
          y: 0,
        },
        {
          x: -0.00013848000246186672,
          y: -0.0007552470568874417,
        },
        {
          x: -0.0008771614849164132,
          y: -0.0003734975546203412,
        },
        {
          x: -0.003414178338193617,
          y: -0.001335679107507458,
        },
        {
          x: -0.00042759039930761263,
          y: -0.0019767387051919587,
        },
        {
          x: 0.004911662234316697,
          y: 0.0006877680598151586,
        },
        {
          x: 0.0071032562147081,
          y: 0.003648859915636707,
        },
        {
          x: 0.011269771752747421,
          y: 0.004767125059148207,
        },
        {
          x: -0.0005841503885103661,
          y: 0.0011846643012381937,
        },
        {
          x: -0.0012697580909287877,
          y: -0.0014169934029461776,
        },
      ],
    },
    filters: [
      {
        parentTitle: 'محور افقی',
        title: 'نام شاخص',
        searchable: false,
        options: [
          {
            identifier: '1',
            title: 'شاخص قیمت هم وزن',
          },
        ],
        selectedOption: {
          identifier: '1',
          title: 'شاخص قیمت هم وزن',
        },
        optionType: 'IndexNameFilterOption',
      },
      {
        parentTitle: 'محور عمودی',
        title: 'شاخص صنعت',
        searchable: true,
        options: [
          {
            identifier: '31',
            title: 'دستگاههای برقی',
          },
          {
            identifier: '56',
            title: 'سرمایه گذاریها',
          },
          {
            identifier: '01',
            title: 'زراعت',
          },
          {
            identifier: '25',
            title: 'لاستیک',
          },
          {
            identifier: '39',
            title: 'چند رشته ای ص',
          },
          {
            identifier: '64',
            title: 'رادیویی',
          },
          {
            identifier: '45',
            title: 'پیمانکاری',
          },
          {
            identifier: '74',
            title: 'فنی مهندسی',
          },
          {
            identifier: '40',
            title: 'تامین آب، برق، گاز',
          },
          {
            identifier: '49',
            title: 'کاشی و سرامیک',
          },
          {
            identifier: '35',
            title: 'حمل و نقل (35)',
          },
          {
            identifier: '20',
            title: 'محصولات چوبی',
          },
          {
            identifier: '66',
            title: 'بیمه و بازنشسته',
          },
          {
            identifier: '17',
            title: 'منسوجات',
          },
          {
            identifier: '65',
            title: 'مالی',
          },
          {
            identifier: '33',
            title: 'ابزار پزشکی',
          },
          {
            identifier: '67',
            title: 'اداره بازارهای مالی',
          },
          {
            identifier: '14',
            title: 'سایر معادن',
          },
          {
            identifier: '55',
            title: 'هتل و رستوران',
          },
          {
            identifier: '11',
            title: 'استخراج نفت جزکشف',
          },
          {
            identifier: '47',
            title: 'خرده فروشی به جز وسایل نقلیه',
          },
          {
            identifier: '19',
            title: 'محصولات چرمی',
          },
          {
            identifier: '53',
            title: 'سیمان',
          },
          {
            identifier: '57',
            title: 'بانکها',
          },
        ],
        selectedOption: {
          identifier: '28',
          title: 'محصولات فلزی',
        },
        optionType: 'SectorIndexFilterOption',
      },
      {
        parentTitle: null,
        title: 'بازه زمانی',
        searchable: false,
        options: [
          {
            identifier: '1',
            title: 'یک سال اخیر',
          },
          {
            identifier: '2',
            title: 'دو سال اخیر',
          },
          {
            identifier: '3',
            title: 'سه سال اخیر',
          },
          {
            identifier: '4',
            title: 'چهار سال اخیر',
          },
        ],
        selectedOption: {
          identifier: '1',
          title: 'یک سال اخیر',
        },
        optionType: 'NumberOfYearsFilterOption',
      },
    ],
  },
};

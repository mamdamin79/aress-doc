import { ActivitiesAccordionHeadProps } from './ActivitiesAccordionHead';

export interface ActivitySection {
  date: string;
  activities: ActivitiesAccordionHeadProps[];
}

export const activitiesData: ActivitySection[] = [
  {
    date: '14 فروردین 1404',
    activities: [
      {
        title: 'بانک سامان',
        price: 43000000,
        status: 'success',
        type: 'ONLINE_DEPOSIT',
        icon: 'CustomSaman',
      },
      {
        title: 'صندوق طلا',
        price: 15000000,
        status: 'success',
        type: 'BUY',
        icon: 'rocket',
        description: 'کالایی',
      },
      {
        title: 'صندوق تکنولوژی',
        price: 2500000,
        status: 'success',
        type: 'DIVIDEND',
        icon: 'computer',
        description: 'سهامی',
      },
    ],
  },
  {
    date: '13 فروردین 1404',
    activities: [
      {
        title: 'صندوق انرژی',
        price: 8700000,
        status: 'success',
        type: 'SELL',
        icon: 'bell-electric',
        description: 'سهامی',
      },
      {
        title: 'برداشت به حساب',
        price: 5000000,
        status: 'pending',
        type: 'WITHDRAW',
        icon: 'CustomMellat',
        description: 'بانک ملت',
      },
    ],
  },
  {
    date: '12 فروردین 1404',
    activities: [
      {
        title: 'بانک پارسیان',
        price: 20000000,
        status: 'success',
        type: 'SLIP_DEPOSIT',
        icon: 'CustomParsian',
      },
      {
        title: 'بانک سامان',
        price: 150000,
        status: 'error',
        type: 'ADJUSTMENT',
        icon: 'CustomSaman',
      },
    ],
  },
];

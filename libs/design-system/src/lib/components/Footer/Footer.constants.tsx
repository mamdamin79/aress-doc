import logo from './../../../public/icons/logo.svg';
import enamad from './../../../public/icons/enamad.svg';
import electronik from './../../../public/icons/electronik.svg';
import telegram from './../../../public/icons/telegram.svg';
import android from './../../../public/icons/android.svg';
import bazar from './../../../public/icons/bazar.svg';
import mayket from './../../../public/icons/mayket.svg';
import playstore from './../../../public/icons/playstore.svg';
import { FooterSection } from './Footer.types';
import { Icon } from '../IconComponent';

export const linksFooter: FooterSection[] = [
  {
    title: 'انواع صندوق ها',
    links: [
      { title: 'صندوق های سهامی', link: '/' },
      { title: 'صندوق های درآمد ثابت', link: '/' },
      { title: 'صندوق های مختلط', link: '/' },
    ],
  },
  {
    title: 'فیلتر صندوق ها',
    links: [
      { title: 'پر بازده ترین', link: '/' },
      { title: 'کم ریسک ترین', link: '/' },
      { title: 'بهترین عملکرد', link: '/' },
    ],
  },
  {
    title: 'سایر',
    links: [
      { title: 'درباره ما', link: '/' },
      { title: 'شرایط قرارداد' },
      { title: 'سوالات متداول', link: '/' },
    ],
  },
  {
    title: 'ارتباط با ما',
    links: [
      { title: 'تــلفن پشتیبانــی:  ۸۰۹۱۶۰۷-۰۲۱' },
      {
        title:
          'آدرس پستی: تهران. یوسف آباد. بین خیابان ۶۳ و ۶۵. پلاک ۴۸۵. واحد ۹۲',
      },
      {
        // Icons for social media and contact methods
        icons: [
          { icon: <Icon size="lg" name="send" />, link: '/' },
          { icon: <Icon size="lg" name="linkedin" />, link: '/' },
          { icon: <Icon size="lg" name="instagram" /> },
        ],
      },
    ],
  },
];

export {
  logo,
  enamad,
  electronik,
  telegram,
  android,
  bazar,
  mayket,
  playstore,
};

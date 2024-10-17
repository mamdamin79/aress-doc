import Image from 'next/image';
import Link from 'next/link';
import { FooterSection } from './Footer.types';
import logo from './../../../public/icons/logo.svg';
import enamad from './../../../public/icons/enamad.png';
import digitalUnion from './../../../public/icons/digital-union.png';
import telegram from './../../../public/icons/telegram.svg';
import android from './../../../public/icons/android.svg';
import bazar from './../../../public/icons/bazar.svg';
import mayket from './../../../public/icons/mayket.svg';
import playstore from './../../../public/icons/playstore.svg';
import { Icon } from '../Icon';
import { cn } from '../../../utils';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
export function Footer() {
  const linksFooter: FooterSection[] = [
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

  const applications = [
    {
      title: 'دانلود مستقیم نسخه اندروید',
      icon: android,
      link: '/',
      idTooltip: 'a',
    },
    {
      title: 'دانلود از پلی استور',
      icon: playstore,
      link: '/',
      idTooltip: 'b',
    },
    { title: 'دانلود از مایکت', icon: mayket, link: '/', idTooltip: 'c' },
    { title: 'دانلود از بازار', icon: bazar, link: '/', idTooltip: 'd' },
  ];

  return (
    <div className="px-5 md:px-20">
      <div className="flex justify-center md:justify-start">
        <Image
          width={0}
          height={0}
          src={logo}
          className="sm:w-24"
          alt="Logo image"
        />
      </div>

      <div className="grid mt-10 grid-cols-1 grid-rows-4 sm:grid-rows-2 lg:grid-rows-1 items-center mx-auto text-center md:text-start sm:grid-cols-2 lg:grid-cols-4">
        {linksFooter.map(({ title, links }) => (
          <div className="mt-8 self-start lg:mt-0">
            <span className="text-gray-1000 mb-6 font-medium text-2xl block">
              {title}
            </span>
            {links.map(({ title, icons, link }) => (
              <div>
                {link ? (
                  <Link
                    className="text-gray-600 hover:text-gray-700 text-md mt-2"
                    href={link}
                  >
                    {title}
                  </Link>
                ) : (
                  <span className="text-gray-600 text-md block mt-2">
                    {title}
                  </span>
                )}
                <div className="flex gap-4 mt-2 justify-center md:justify-start text-brand-600">
                  {icons?.map(({ icon, link }) => (
                    <div className="text-brand-600 hover:text-brand-700 transition">
                      {link ? (
                        <Link href={link}>{icon}</Link>
                      ) : (
                        <div>{icon}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-16 flex items-center flex-col lg:flex-row justify-between">
        <div className="flex flex-col md:flex-row items-center gap-20">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-semibold text-center md:text-right">
              دانلود اپلیکیشن
            </span>
            <div className="flex items-center gap-3 mt-6">
              {applications.map((item) => (
                <Link
                  href={item.link}
                  className={cn(
                    'rounded-lg bg-gray-100 py-2.5 px-4',
                    item.idTooltip
                  )}
                >
                  <Image src={item.icon} width={0} height={0} alt="Android" />
                  <Tooltip
                    noArrow
                    className="tooltip text-xs"
                    place="bottom"
                    anchorSelect={`.${item.idTooltip}`}
                  >
                    {item.title}
                  </Tooltip>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-semibold text-center md:text-right">
              ربات هوشمند تلگرام
            </span>
            <div className="rounded-lg bg-gray-100 py-2.5 mt-6 w-fit px-4 flex items-center gap-2">
              <Image src={telegram} width={0} height={0} alt="Telegram" />
              <span className="font-medium text-xs">ورود به ربات</span>
            </div>
          </div>
        </div>
        <div className="flex mt-6 lg:mt-0 items-center gap-8">
          <Link href="/" className="rounded-2xl bg-gray-100 p-4">
            <Image
              width={0}
              height={0}
              className="w-16 h-16"
              src={enamad}
              alt="enamad"
            />
          </Link>
          <Link href="/" className="rounded-2xl cursor-pointer bg-gray-100 p-4">
            <Image
              width={0}
              height={0}
              className="w-16 h-16"
              src={digitalUnion}
              alt="digitalUnion"
            />
          </Link>
        </div>
      </div>

      <div className="mt-10 text-xs flex-col sm:flex-row flex items-center justify-between">
        <p className="font-medium">
          © تمامی حقوق اینترنتی برای پردازش اطلاعات مالی آرسس محفوظ است.
        </p>
        <Link href="/" className="border-b font-semibold">
          قوانین و مقررات
        </Link>
      </div>
    </div>
  );
}

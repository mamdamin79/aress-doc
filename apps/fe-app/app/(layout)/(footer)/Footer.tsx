import Image from 'next/image';
import Link from 'next/link';
import { FooterSection } from './Footer.types';
import PRODUCT_LOGO from '@aress-assets/icons/product_logo.svg';
import Enamad from '@aress-assets/icons/enamad.png';
import DigitalUnion from '@aress-assets/icons/digital-union.png';
import TELEGRAM_ICON from '@aress-assets/icons/telegram.svg';
import ANDROID_ICON from '@aress-assets/icons/android.svg';
import BAZAR_ICON from '@aress-assets/icons/bazar.svg';
import MAYKET_ICON from '@aress-assets/icons/mayket.svg';
import PLAYSTORE_ICON from '@aress-assets/icons/playstore.svg';
import { Tooltip } from 'design-system';
import { Icon } from 'design-system';
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
      icon: ANDROID_ICON,
      link: '/',
    },
    {
      title: 'دانلود از پلی استور',
      icon: PLAYSTORE_ICON,
      link: '/',
    },
    { title: 'دانلود از مایکت', icon: MAYKET_ICON, link: '/' },
    { title: 'دانلود از بازار', icon: BAZAR_ICON, link: '/' },
  ];

  return (
    <div className="px-5 md:px-20">
      <div className="flex justify-center md:justify-start">
        <Image width={104} height={104} src={PRODUCT_LOGO} alt="Logo image" />
      </div>

      <div className="mx-auto mt-10 grid grid-cols-1 grid-rows-4 items-center text-center sm:grid-cols-2 sm:grid-rows-2 md:text-start lg:grid-cols-4 lg:grid-rows-1">
        {linksFooter.map(({ title, links }, index) => (
          <div key={index} className="mt-8 self-start lg:mt-0">
            <span className="text-gray-1000 mb-6 block text-2xl font-medium">
              {title}
            </span>
            {links.map(({ title, icons, link }, index) => (
              <div key={index}>
                {link ? (
                  <Link
                    className="text-md mt-2 text-gray-600 hover:text-gray-700"
                    href={link}
                  >
                    {title}
                  </Link>
                ) : (
                  <span className="text-md mt-2 block text-gray-600">
                    {title}
                  </span>
                )}
                <div className="text-brand-600 mt-2 flex justify-center gap-4 md:justify-start">
                  {icons?.map(({ icon, link }, index) => (
                    <div
                      key={index}
                      className="text-brand-600 hover:text-brand-700 transition"
                    >
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

      <div className="mt-16 flex flex-col items-center justify-between lg:flex-row">
        <div className="flex flex-col items-center gap-20 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-center text-2xl font-semibold md:text-right">
              دانلود اپلیکیشن
            </span>
            <div className="mt-6 flex items-center gap-3">
              {applications.map((item, index) => (
                <Link key={index} href={item.link}>
                  <Tooltip
                    position="bottom"
                    className="!rounded-xs !px-2 !py-0 !text-sm"
                    title={item.title}
                  >
                    <div className="rounded-lg bg-gray-100 px-4 py-2.5">
                      <Image
                        src={item.icon}
                        width={24}
                        height={24}
                        alt="Android"
                      />
                    </div>
                  </Tooltip>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-center text-2xl font-semibold md:text-right">
              ربات هوشمند تلگرام
            </span>
            <div className="mt-6 flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5">
              <Image
                src={TELEGRAM_ICON}
                width={24}
                height={24}
                alt="Telegram"
              />
              <span className="text-xs font-medium">ورود به ربات</span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-8 lg:mt-0">
          <Link href="/" className="rounded-2xl bg-gray-100 p-4">
            <Image
              width={0}
              height={0}
              className="h-16 w-16"
              src={Enamad}
              alt="enamad"
            />
          </Link>
          <Link href="/" className="cursor-pointer rounded-2xl bg-gray-100 p-4">
            <Image
              width={0}
              height={0}
              className="h-16 w-16"
              src={DigitalUnion}
              alt="digitalUnion"
            />
          </Link>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-between text-xs text-gray-600 sm:flex-row">
        <p className="font-medium">
          © تمامی حقوق اینترنتی برای پردازش اطلاعات مالی آرسس محفوظ است.
        </p>
        <Link href="/" className="font-semibold">
          قوانین و مقررات
        </Link>
      </div>
    </div>
  );
}

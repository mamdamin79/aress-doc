import Logo from '@aress-assets/icons/Logo.svg';
import AbstractLine from '@aress-assets/icons/Abstract.svg';
import Instagram from '@aress-assets/icons/instagram.svg';
import Linkedin from '@aress-assets/icons/lite-linkedin.svg';
import telegram from '@aress-assets/icons/telegram-2.svg';
import Link from 'next/link';
import Image from 'next/image';

export function FooterLite() {
  return (
    <div className="relative bg-white w-full mx-auto overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-20 py-6">
        <Link href="/">
          <Image width={251} height={72} src={Logo} className="h-[72px] w-[251px]" alt="logo" />
        </Link>
        <div className="mt-8 grid grid-cols-4 gap-4 lg:grid-cols-5 grid-rows-4 md:grid-rows-2 lg:grid-rows-1 items-start">
          <Link className="col-span-1 row-start-1 h-fit text-3xl font-medium" href="/">
            ارتباط با ما
          </Link>
          <div className="col-span-4 h-fit md:col-span-1 row-start-4 md:row-start-2 lg:row-start-1 flex flex-col gap-2">
            <span className="text-gray-1000 text-lg">شبکه های اجتماعی:‌</span>
            <div className="flex items-center gap-6">
              <Link href='/'>
                <Image
                  width={0}
                  height={0}
                  className="h-6 w-6 cursor-pointer"
                  src={telegram}
                  alt="telegramicon"
                />
              </Link>
              <Link href='/'>
                <Image
                  width={0}
                  height={0}
                  className="h-6 w-6 cursor-pointer"
                  src={Linkedin}
                  alt="linkedinicon"
                />
              </Link>
              <Link href='/'>
                <Image
                  width={0}
                  height={0}
                  className="h-6 w-6 cursor-pointer"
                  src={Instagram}
                  alt="instagramicon"
                />
              </Link>
            </div>
          </div>
          <div className="col-span-4 h-fit md:col-span-1 row-start-3 md:row-start-2 lg:row-start-1 flex flex-col gap-2">
            <span className="text-gray-1000 text-lg">تلفن پشتیبانی:‌</span>
            <span className="text-gray-700">021-8091607</span>
          </div>
          <div className="col-span-4 h-fit md:col-span-2 flex row-start-2 md:row-start-2 lg:row-start-1 flex-col gap-2">
            <span className="text-gray-1000 text-lg">آدرس پستی:</span>
            <p className="break-words text-gray-700">
              آدرس پستی: تهران. یوسف آباد. بین خیابان ۶۳ و ۶۵. پلاک ۴۸۵. واحد ۹۲
            </p>
          </div>
        </div>
        <div className="mt-14 flex items-center justify-between text-xs font-semibold text-gray-700">
          <span>
            © تمامی حقوق اینترنتی برای پردازش اطلاعات مالی آرسس محفوظ است.
          </span>
          <Link href='/'>قوانین و مقررات</Link>
        </div>
      </div>
      <Image
        width={100}
        height={200}
        src={AbstractLine}
        className="absolute h-[300px] lg:top-10 top-20 w-[1400px] lg:w-[2200px] opacity-[0.1]"
        alt="Abstract Line"
      />
    </div>
  );
}

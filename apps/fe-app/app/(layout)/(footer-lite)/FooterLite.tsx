import Logo from '@aress-assets/icons/logo.svg';
import AbstractLine from '@aress-assets/icons/Abstract.svg';
import Instagram from '@aress-assets/icons/lite_instagram.svg';
import Linkedin from '@aress-assets/icons/lite-linkedin.svg';
import telegram from '@aress-assets/icons/lite_telegram.svg';
import Link from 'next/link';
import Image from 'next/image';

export function FooterLite() {
  return (
    <div className="relative mx-auto w-full overflow-hidden bg-white">
      <div className="relative z-10 mx-auto max-w-7xl px-20 py-6">
        <Link href="/">
          <Image
            width={251}
            height={72}
            src={Logo}
            className="h-[72px] w-[251px]"
            alt="logo"
          />
        </Link>
        <div className="mt-8 grid grid-cols-4 grid-rows-4 items-start gap-4 md:grid-rows-2 lg:grid-cols-5 lg:grid-rows-1">
          <Link
            className="col-span-1 row-start-1 h-fit text-3xl font-medium"
            href="/"
          >
            ارتباط با ما
          </Link>
          <div className="col-span-4 row-start-4 flex h-fit flex-col gap-2 md:col-span-1 md:row-start-2 lg:row-start-1">
            <span className="text-gray-1000 text-lg">شبکه های اجتماعی:‌</span>
            <div className="flex items-center gap-6">
              <Link href="/">
                <Image
                  width={0}
                  height={0}
                  className="h-6 w-6 cursor-pointer"
                  src={telegram}
                  alt="telegramicon"
                />
              </Link>
              <Link href="/">
                <Image
                  width={0}
                  height={0}
                  className="h-6 w-6 cursor-pointer"
                  src={Linkedin}
                  alt="linkedinicon"
                />
              </Link>
              <Link href="/">
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
          <div className="col-span-4 row-start-3 flex h-fit flex-col gap-2 md:col-span-1 md:row-start-2 lg:row-start-1">
            <span className="text-gray-1000 text-lg">تلفن پشتیبانی:‌</span>
            <span className="text-gray-700">021-8091607</span>
          </div>
          <div className="col-span-4 row-start-2 flex h-fit flex-col gap-2 md:col-span-2 md:row-start-2 lg:row-start-1">
            <span className="text-gray-1000 text-lg">آدرس پستی:</span>
            <p className="break-words text-gray-700">
              تهران، یوسف آباد، بین خیابان ۶۳ و ۶۵، پلاک ۴۸۵، واحد ۹۲
            </p>
          </div>
        </div>
        <div className="mt-14 flex items-center justify-between text-xs font-semibold text-gray-700">
          <span>
            © تمامی حقوق اینترنتی برای پردازش اطلاعات مالی آرسس محفوظ است.
          </span>
          <Link href="/">قوانین و مقررات</Link>
        </div>
      </div>
      <Image
        width={100}
        height={200}
        src={AbstractLine}
        className="absolute top-20 h-[300px] w-[1400px] opacity-[0.1] lg:top-10 lg:w-[2200px]"
        alt="Abstract Line"
      />
    </div>
  );
}

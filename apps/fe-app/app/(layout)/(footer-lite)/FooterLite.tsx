import { ReactComponent as Logo } from '@aress-assets/icons/logo.svg';
import { ReactComponent as AbstractLine } from '@aress-assets/icons/Abstract.svg';
import { ReactComponent as Instagram } from '@aress-assets/icons/lite_instagram.svg';
import { ReactComponent as Linkedin } from '@aress-assets/icons/lite-linkedin.svg';
import { ReactComponent as Telegram } from '@aress-assets/icons/lite_telegram.svg';
import Link from 'next/link';

export function FooterLite() {
  return (
    <div className="border-border-neutral-primary bg-surface-neutral-background text-text-neutral-primary relative mx-auto w-full overflow-hidden border-t">
      <div className="relative z-10 mx-auto max-w-[1680px] px-20 py-6">
        <Link href="/" aria-label="صفحه اصلی">
          <span className="inline-block h-[72px] w-[251px]">
            <Logo className="h-full w-full" />
          </span>
        </Link>

        <div className="mt-8 grid grid-cols-4 grid-rows-4 items-start gap-4 md:grid-rows-2 lg:grid-cols-5 lg:grid-rows-1">
          <Link
            href="/"
            className="col-span-1 row-start-1 text-3xl font-medium"
          >
            ارتباط با ما
          </Link>

          <div className="col-span-4 row-start-4 flex flex-col gap-2 md:col-span-1 md:row-start-2 lg:row-start-1">
            <span className="text-lg">شبکه های اجتماعی:</span>
            <div className="flex items-center gap-6">
              <Link href="/" aria-label="تلگرام">
                <span className="h-6 w-6 cursor-pointer">
                  <Telegram className="h-full w-full" />
                </span>
              </Link>
              <Link href="/" aria-label="لینکدین">
                <span className="h-6 w-6 cursor-pointer">
                  <Linkedin className="h-full w-full" />
                </span>
              </Link>
              <Link href="/" aria-label="اینستاگرام">
                <span className="h-6 w-6 cursor-pointer">
                  <Instagram className="h-full w-full" />
                </span>
              </Link>
            </div>
          </div>

          <div className="col-span-4 row-start-3 flex flex-col gap-2 md:col-span-1 md:row-start-2 lg:row-start-1">
            <span className="text-lg">تلفن پشتیبانی:</span>
            <span className="text-text-neutral-secondarycontrast">
              021-8091607
            </span>
          </div>

          <div className="col-span-4 row-start-2 flex flex-col gap-2 md:col-span-2 md:row-start-2 lg:row-start-1">
            <span className="text-lg">آدرس پستی:</span>
            <p className="text-text-neutral-secondarycontrast break-words">
              تهران، یوسف آباد، بین خیابان ۶۳ و ۶۵، پلاک ۴۸۵، واحد ۹۲
            </p>
          </div>
        </div>

        <div className="text-text-neutral-secondarycontrast mt-14 flex flex-col items-center justify-between gap-3 text-xs font-semibold sm:flex-row">
          <span>
            © تمامی حقوق اینترنتی برای پردازش اطلاعات مالی آرسس محفوظ است.
          </span>
          <Link href="/">
            <span className="hover:underline">قوانین و مقررات</span>
          </Link>
        </div>
      </div>

      <div className="absolute top-20 w-full opacity-[0.1] lg:top-10">
        <AbstractLine className="h-[200px] w-full" />
      </div>
    </div>
  );
}

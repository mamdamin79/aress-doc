import Image from 'next/image';
import Link from 'next/link';
import { FooterSection, IconType, FooterLink } from './Footer.types';
import {
  logo,
  android,
  bazar,
  electronik,
  enamad,
  mayket,
  playstore,
  telegram,
  linksFooter,
} from './Footer.constants';

export function Footer() {
  return (
    <div className="px-5 md:px-20">
      <div className="flex justify-center md:justify-start">
        <Image
          width={0}
          height={0}
          src={logo}
          className="w-[70%] sm:w-24"
          alt="Logo image"
        />
      </div>

      <div className="grid mt-10 grid-cols-1 grid-rows-4 sm:grid-rows-2 lg:grid-rows-1 items-center mx-auto text-center md:text-start sm:grid-cols-2 lg:grid-cols-4">
        {linksFooter.map(({ title, links }: FooterSection) => (
          <div className="mt-8 self-start lg:mt-0">
            <p className="text-gray-1000 pb-6 text-2xl">{title}</p>
            {links.map(({ title, icons, link }: FooterLink) => (
              <div>
                {link ? (
                  <Link className="text-gray-600 text-md m-2" href={link}>
                    {title}
                  </Link>
                ) : (
                  <span className="text-gray-600 text-md m-2">{title}</span>
                )}
                <div className="flex gap-4 justify-center md:justify-start text-brand-600">
                  {icons?.map(({ icon, link }: IconType) => (
                    <div>
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
          <div>
            <span className="text-2xl text-center md:text-right">
              دانلود اپلیکیشن
            </span>
            <div className="flex items-center gap-3 mt-6">
              <Link href="/" className="rounded-lg bg-gray-100 py-2.5 px-4">
                <Image src={android} width={0} height={0} alt="Android" />
              </Link>
              <Link href="/" className="rounded-lg bg-gray-100 py-2.5 px-4">
                <Image src={playstore} width={0} height={0} alt="Playstore" />
              </Link>
              <Link href="/" className="rounded-lg bg-gray-100 py-2.5 px-4">
                <Image src={mayket} width={0} height={0} alt="mayket" />
              </Link>
              <Link href="/" className="rounded-lg bg-gray-100 py-2.5 px-4">
                <Image src={bazar} width={0} height={0} alt="Bazar" />
              </Link>
            </div>
          </div>
          <div>
            <span className="text-2xl text-center md:text-right">
              ربات هوشمند تلگرام
            </span>
            <div className="rounded-lg bg-gray-100 py-2.5 mt-6 w-fit px-4 flex items-center gap-2">
              <Image src={telegram} width={0} height={0} alt="Telegram" />
              <p>ورود به ربات</p>
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
              alt="eNAMAD"
            />
          </Link>
          <Link href="/" className="rounded-2xl cursor-pointer bg-gray-100 p-4">
            <Image
              width={0}
              height={0}
              className="w-16 h-16"
              src={electronik}
              alt="Electronik"
            />
          </Link>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between text-xs">
        <p>© تمامی حقوق اینترنتی برای پردازش اطلاعات مالی آرسس محفوظ است.</p>
        <Link href="/" className="border-b">
          قوانین و مقررات
        </Link>
      </div>
    </div>
  );
}

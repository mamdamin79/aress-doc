'use client';
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import websiteTrafficAnimation from './_lottie_data/Website_Traffic_Data.json';
import CreditCardAnimation from './_lottie_data/Credit_Card.json';
import SuccessfulMarketerAnimation from './_lottie_data/Successful_Marketer.json';
import OnlineBankingAnimation from './_lottie_data/Online_Banking.json';
import CryptocurrencyAppAnimation from './_lottie_data/CryptocurrencyApp.json';

import { Button } from 'design-system';
import { Indicator } from './_components/Indicator';
import Link from 'next/link';

const Page = () => {
  const slidesData = [
    {
      title: 'پردازش اطلاعات مالی آرسس',
      description:
        'با آرسس اینوستور، سرمایه‌گذاری آسان و آینده‌ای روشن در دسترس شماست!',
      lottieAnimation: SuccessfulMarketerAnimation,
    },
    {
      title: 'زیر نظر سازمان بورس',
      description:
        'ما در آرسس اینوستور بستری امن برای سرمایه‌گذاری آسان شما فراهم کردیم.',
      lottieAnimation: OnlineBankingAnimation,
    },

    {
      title: 'ما به سجام متصل هستیم',
      description:
        'فقط با ارائه شماره ملی، پیامک تأیید به موبایل‌تان ارسال می‌شود و فرآیند ثبت‌نام به سادگی تکمیل می‌گردد!',
      lottieAnimation: CreditCardAnimation,
    },
    {
      title: 'دسترسی به مدیران سرمایه گذاری',
      description:
        'به صندوق‌های سرمایه‌گذاری تحت مدیریت حرفه‌ای‌ترین مدیران دسترسی پیدا کنید.',
      lottieAnimation: CryptocurrencyAppAnimation,
    },
    {
      title: 'مقایسه انواع صندوق سرمایه گذاری',
      description:
        'به راحتی در انواع صندوق‌های طلا، سهام و درآمد ثابت سرمایه‌گذاری کنید و آن‌ها را مقایسه کنید.',
      lottieAnimation: websiteTrafficAnimation,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === slidesData.length - 1 ? 0 : prev + 1,
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="text-text-neutral-primary relative flex w-full justify-center pb-5">
      <div className="-z-0 flex w-[470px] flex-col items-center">
        {/* Lottie Animation Container with fade transition */}
        <div className="relative h-[272px] w-[272px]">
          {slidesData.map((data, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in ${
                currentIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Lottie
                animationData={data.lottieAnimation}
                loop={true}
                className="h-[272px] w-[272px]"
                key={`lottie-${index}-${currentIndex === index ? 'active' : 'inactive'}`}
              />
            </div>
          ))}
        </div>

        {/* Content with fade transition */}
        <div className="relative flex min-h-[120px] flex-col items-center gap-4">
          {slidesData.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col items-center gap-4 transition-opacity duration-700 ease-in-out ${
                currentIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
              dir="rtl" // add this for right-to-left text
            >
              <h1 className="whitespace-nowrap text-center text-xl font-semibold">
                {slide.title}
              </h1>
              <span className="text-text-neutral-tertiary text-md w-[470px] text-center font-medium">
                {slide.description}
              </span>
            </div>
          ))}
        </div>

        {/* Dot Indicator */}
        <div className="mt-5">
          <Indicator
            barsNumber={slidesData.length}
            onChangeIndex={(index) => setCurrentIndex(index)}
            externalIndex={currentIndex}
          />
        </div>
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex w-[313px] flex-col gap-3">
            <Link href={'/Signin'}>
              <Button
                theme="brand"
                align="center"
                mode="primary"
                size="md"
                className="w-full font-medium"
              >
                ورود
              </Button>
            </Link>

            <Link href={'/Signup'}>
              <Button
                theme="brand"
                align="center"
                mode="secondary"
                size="md"
                className="w-full font-medium"
              >
                ثبت نام
              </Button>
            </Link>
          </div>
          <div className="text-md flex items-center justify-center font-medium">
            <span className="whitespace-nowrap text-nowrap">
              مدیر صندوق هستید؟
            </span>
            <Button
              theme="brand"
              align="center"
              mode="underline"
              size="sm"
              className="font-medium"
            >
              از آرسس ترمینال وارد شوید
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

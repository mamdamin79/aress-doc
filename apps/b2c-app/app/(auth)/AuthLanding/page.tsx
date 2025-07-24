'use client';
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import websiteTrafficAnimation from './_lottie_data/Website_Traffic_Data.json';
import CreditCardAnimation from './_lottie_data/Credit_Card.json';
import SuccessfulMarketerAnimation from './_lottie_data/Successful_Marketer.json';
import OnlineBankingAnimation from './_lottie_data/Online_Banking.json';
import CryptocurrencyAppAnimation from './_lottie_data/CryptocurrencyApp.json';

import { Button, DotIndicator } from 'design-system';

const page = () => {
  const slidesData = [
    {
      title: 'مقایسه انواع صندوق سرمایه‌گذاری',
      description:
        'به راحتی در انواع صندوق‌های طلا، سهام و درآمد ثابت سرمایه‌گذاری کنید و آنها را مقایسه کنید',
      lottieAnimation: websiteTrafficAnimation,
    },
    {
      title: 'تحلیل و بررسی عملکرد',
      description:
        'عملکرد صندوق‌های خود را به صورت لحظه‌ای پیگیری کنید و تصمیمات بهتری بگیرید',
      lottieAnimation: SuccessfulMarketerAnimation,
    },
    {
      title: 'مدیریت پرتفوی هوشمند',
      description:
        'با ابزارهای پیشرفته، پرتفوی سرمایه‌گذاری خود را به صورت حرفه‌ای مدیریت کنید',
      lottieAnimation: CreditCardAnimation,
    },
    {
      title: 'گزارش‌گیری جامع',
      description:
        'دسترسی به گزارش‌های تفصیلی و تحلیل‌های عمیق از سرمایه‌گذاری‌های خود داشته باشید',
      lottieAnimation: OnlineBankingAnimation,
    },
    {
      title: 'گزارش‌گیری جامع',
      description:
        'دسترسی به گزارش‌های تفصیلی و تحلیل‌های عمیق از سرمایه‌گذاری‌های خود داشته باشید',
      lottieAnimation: CryptocurrencyAppAnimation,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(slidesData.length - 1);

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? slidesData.length - 1 : prev - 1,
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-text-neutral-primary flex w-full justify-center">
      <div className="flex w-[470px] flex-col items-center">
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
          <DotIndicator
            currentIndex={currentIndex}
            setIndex={setCurrentIndex}
            totalLength={slidesData.length}
          />
        </div>
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex w-[313px] flex-col gap-3">
            <Button
              align="center"
              mode="primary"
              size="md"
              className="w-full font-medium"
            >
              ورود
            </Button>
            <Button
              align="center"
              mode="secondary"
              size="md"
              className="w-full font-medium"
            >
              ثبت نام
            </Button>
          </div>
          <div className="text-md flex items-center justify-center font-medium">
            <span className="whitespace-nowrap text-nowrap">
              مدیر صندوق هستید؟
            </span>
            <Button align="center" mode="underline" size="sm">
              از آرسس ترمینال وارد شوید
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

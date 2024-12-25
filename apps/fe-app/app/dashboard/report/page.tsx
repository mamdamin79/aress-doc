'use client';
import { Button, Heart, Icon } from 'design-system';
import Image from 'next/image';
import React from 'react';
import fake2 from '../fake2.png';
import { NewBadge } from 'design-system';
const page = () => {
  return (
    <div className="h-[100vh]">
      <div className="flex w-full flex-row justify-around gap-8 px-20 pt-6">
        <div className="flex w-fit flex-col gap-2">
          <div className="rounded-3xl bg-gray-100 p-4">
            <Image src={fake2} alt="fake2" width={616} height={320} />
          </div>
          <div className="flex flex-row items-center gap-1 text-sm font-normal">
            <Icon name="info" size="md" />
            <span>با زدن بر روی آیکون </span>
            <span className="flex flex-row items-center">
              {'('} <Icon name="settings" size="sm" />
              {')'}
            </span>
            <span> امکان تغییر تنظیمات پیشفرض پروژه وجود دارد.</span>
          </div>
        </div>
        <div className="flex w-[600px] flex-col gap-4">
          <h3 className="text-right text-2xl font-medium">
            ورود و خروج سرمایه‌گذاران حقیقی به سهام و درآمد ثابت
          </h3>
          <div className="flex w-full flex-row justify-between text-sm">
            <div className="flex flex-row items-center gap-4">
              <span className="flex flex-row items-center gap-1">
                <Icon name="layers-2" size="md" />
                صندوق‌های درآمد ثابت
              </span>
              <NewBadge />
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center">
                <Heart
                  initialIsliked={false}
                  onLike={() => console.log('sdasdd')}
                />
              </div>
              <Button align="center" isLoading={false} mode="primary" size="sm">
                <div className="flex w-fit flex-row gap-2">
                  <Icon name="plus" size="lg" />
                  <div> افزودن به داشبورد</div>
                </div>
              </Button>
            </div>
          </div>
          <div className="h-0.5 w-full border border-gray-300"></div>
          <span className="text-md text-right font-medium">معرفی کوتاه:</span>
          <p className="text-xs font-normal">
            این گزارش روند ورود و خروج سرمایه‌گذاران حقیقی به دو دسته دارایی را
            بررسی می‌کند: سهام و درآمد ثابت. به طور خلاصه، میزان
            سرمایه‌گذاری‌های جدید و برداشت‌های انجام شده در این دو بخش را طی یک
            دوره زمانی مشخص تحلیل می‌کند تا نوسانات و تمایلات سرمایه‌گذاران
            حقیقی را نشان دهد.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;

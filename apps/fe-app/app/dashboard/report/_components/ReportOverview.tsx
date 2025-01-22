'use client';
import React from 'react';
import { Button, NewBadge, Heart, Icon } from 'design-system';
import { TextWithIcon } from 'compositions';

export const ReportOverview: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <h3 className="text-right text-2xl font-medium">
        ورود و خروج سرمایه‌گذاران حقیقی به سهام و درآمد ثابت
      </h3>
      <div className="flex w-full flex-row justify-between text-sm">
        <div className="flex flex-row items-center gap-4">
          <TextWithIcon
            icon={{ name: 'layers-2', size: 'md' }}
            text="صندوق درآمد ثابت"
          />
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
      <div className="h-0 w-full border border-gray-300"></div>
      <span className="text-md text-right font-medium">معرفی کوتاه:</span>
      <p className="text-xs font-normal">
        این گزارش روند ورود و خروج سرمایه‌گذاران حقیقی به دو دسته دارایی را
        بررسی می‌کند: سهام و درآمد ثابت. به طور خلاصه، میزان سرمایه‌گذاری‌های
        جدید و برداشت‌های انجام شده در این دو بخش را طی یک دوره زمانی مشخص تحلیل
        می‌کند تا نوسانات و تمایلات سرمایه‌گذاران حقیقی را نشان دهد.
      </p>
    </div>
  );
};

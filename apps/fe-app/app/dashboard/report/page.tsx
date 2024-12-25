import { Icon } from 'design-system';
import Image from 'next/image';
import React from 'react';
import fake2 from '../fake2.png';
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
          <div className="flex w-full flex-row justify-between">
            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

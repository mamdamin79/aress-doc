import { Button } from 'design-system';
import Lottie from 'lottie-react';
import Link from 'next/link';
import React from 'react';
import ErrorAnimation from '../_lottie_data/error.json';
import SuccessAnimation from '../_lottie_data/check.json';
interface ResultProps {
  type: 'success' | 'failed';
}
const ResultConfig = {
  success: {
    title: 'حساب سرمایه‌گذاری شما ساخته شد!',
    description:
      'از این پس می‌توانید بدون احراز هویت مجدد از آرسس اینستور استفاده کنید.',
    lottieAnimation: SuccessAnimation,
  },
  failed: {
    title: 'احراز هویت شما در سامانه سجام انجام نشده است.',
    description:
      'از طریق دکمه ثبت‌نام سجام  وارد سامانه سجام شده و اطلاعات خود را تکمیل نمایید. پس از تکمیل فرایند، دوباره استعلام بگیرید.',
    lottieAnimation: ErrorAnimation,
  },
};
export const Result: React.FC<ResultProps> = ({ type }) => {
  const { title, description, lottieAnimation } = ResultConfig[type];

  return (
    <div
      dir="rtl"
      className="bg-surface-neutral-primary border-border-neutral-primary h-[404px] w-[528px] rounded-3xl border p-6"
    >
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex w-full flex-col items-center gap-4">
          {/* title */}
          <span className="text-text-neutral-primary text-xl font-medium">
            {title}
          </span>
          {/* description */}
          <span className="text-text-neutral-secondary text-md text-center">
            {description}
          </span>
        </div>
        <div className="flex w-full justify-center">
          <Lottie
            animationData={lottieAnimation}
            loop={false}
            className="h-[125px] w-[125px]"
          />
        </div>

        {type === 'success' ? (
          <Link href={'/'} className="w-full">
            <Button
              className="font-medium"
              align="center"
              isLoading={false}
              mode="primary"
              size="md"
              type="button"
            >
              بازگشت به صفحه اصلی
            </Button>
          </Link>
        ) : (
          <div className="flex w-full flex-row justify-center gap-4">
            <Button align="center" mode="primary" size="md" type="submit">
              ثبت‌نام سجام
            </Button>

            <Link href={'/AuthLanding'} className="w-full">
              <Button
                className="font-medium"
                align="center"
                isLoading={false}
                mode="secondary"
                size="md"
                type="button"
              >
                بازگشت
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

'use client';
import React, { useState } from 'react';
import {
  Dialog,
  Button,
  Icon,
  Badge,
  BadgeProps,
  Checkbox,
  OptionsDropdown,
} from 'design-system';
import { cn } from 'design-system';
import { TRADE_POPUP_BACKGROUNDS } from './TradePopup.constants';

export interface TradePopupProps {
  isOpen: boolean;
  onClose: () => void;
  fundName?: string;
  badge?: BadgeProps;
  currentPrice?: number;
  minInvestment?: number;
  maxInvestment?: number;
  mode?: 'buy' | 'sell';
}
const quantityOptions = [
  5000000, 10000000, 50000000, 100000000, 500000000, 1000000000,
];

export const TradePopup: React.FC<TradePopupProps> = ({
  isOpen,
  onClose,
  fundName = 'مشترک افق روشن کارگزاری بانک خاورمیانه',
  currentPrice = 152000000,
  minInvestment = 15000000,
  maxInvestment = 1000,
  mode = 'buy',
  badge = {
    theme: 'green',
    title: 'سهامی',
  },
}) => {
  const [investmentAmount, setInvestmentAmount] = useState(quantityOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const formatNumber = (num: number) => {
    return num.toLocaleString('fa-IR');
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + Number(investmentAmount));
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - Number(investmentAmount));
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-[542px] border-0 p-0 pb-8"
    >
      <div className="flex flex-col gap-6">
        <div
          className={cn(
            'border-border-neutral-primary h-[72px] rounded-t-2xl border-b px-6',
            'flex w-full flex-row items-center justify-start',
          )}
          style={{
            background: TRADE_POPUP_BACKGROUNDS[mode],
          }}
        >
          <span
            className={cn(
              'text-lg font-medium',
              mode === 'buy'
                ? 'text-text-accent-green-primary-600'
                : 'text-text-accent-red-contrast-700',
            )}
          >
            {mode === 'buy' ? 'خرید واحد' : 'فروش واحد'}
          </span>
        </div>

        {/* Fund Name */}
        <div className="w-full px-6 text-center">
          <div className="bg-surface-neutral-primary border-border-neutral-primary inline-flex h-[62px] w-full items-center justify-between gap-2 rounded-2xl border px-4 py-1">
            <div className="flex flex-row items-center gap-2">
              <div className="bg-surface-neutral-secondary h-[38px] w-[38px] rounded-full"></div>
              <span className="text-sm font-medium">{fundName}</span>
            </div>
            <Badge {...badge} />
          </div>
        </div>

        {/* Investment Amount Input */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-text-neutral-secondarycontrast text-sm font-medium">
            مبلغ سرمایه‌گذاری را وارد کنید.
          </span>
          <div className="flex w-full flex-row justify-start px-6">
            {/* Quantity Controls */}
            <div className="flex flex-col">
              <span className="text-text-neutral-secondarycontrast text-right text-xs font-medium">
                گام تغییر
              </span>
              <div>
                <OptionsDropdown
                  triggerClassName="w-[107px]"
                  dropDownStyles={{
                    bg: 'primary',
                    emphasize: 'high',
                    size: 'md',
                    anchor: 'bottom start',
                  }}
                  dropDownList={quantityOptions.map((option) => ({
                    text: formatNumber(option),
                  }))}
                  onChange={(selectedtItem) =>
                    setInvestmentAmount(Number(selectedtItem))
                  }
                />
              </div>
            </div>

            <div className="flex flex-row items-center gap-4 px-6 pt-4">
              <div className="flex flex-col justify-start gap-2">
                <Button
                  theme="brand"
                  mode="primary"
                  size="sm"
                  className="h-8 w-10"
                  onClick={incrementQuantity}
                >
                  <Icon name="plus" size="lg" />
                </Button>
                <Button
                  theme="brand"
                  mode="secondary"
                  size="sm"
                  className="h-8 w-10"
                  onClick={decrementQuantity}
                >
                  <Icon name="minus" size="lg" />
                </Button>
              </div>
              {/* Price Display */}
              <div className="text-center">
                <div className="text-text-neutral-primary flex items-center gap-1 text-[32px] font-medium">
                  {formatNumber(currentPrice)}
                  <span className="text-text-neutral-secondary text-sm">
                    ریال
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <div className="bg-surface-neutral-secondary text-text-neutral-secondary rounded-md px-2 pt-1 text-xs font-medium">
              معادل پانزده میلیون تومان
            </div>
          </div>
        </div>

        {/* Investment Limits */}
        <div className="space-y-2 px-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-neutral-secondarycontrast">
              حدود قیمت خرید:
            </span>
            <span className="text-text-neutral-primary font-medium">
              {formatNumber(minInvestment)} ریال
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-neutral-secondarycontrast">
              حدود تعداد واحد:
            </span>
            <span className="text-text-neutral-primary font-medium">
              {formatNumber(maxInvestment)} واحد
            </span>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex w-full items-start px-6">
          <Checkbox
            onChange={() => setAcceptTerms(!acceptTerms)}
            reactcontent={
              <div className="flex flex-row items-center gap-1 whitespace-nowrap">
                <span className="text-text-brand-primary-600 cursor-pointer underline underline-offset-8">
                  اساس‌نامه
                </span>
                و
                <span className="text-text-brand-primary-600 cursor-pointer underline underline-offset-8">
                  امیدنامه
                </span>
                را می‌پذیرم و
                <span className="text-text-brand-primary-600 cursor-pointer underline underline-offset-8">
                  بیانیه ریسک را
                </span>
                قبول دارم.
              </div>
            }
          />
        </div>

        {/* Action Buttons */}
        <div className="flex w-full justify-end gap-2 px-6">
          <Button
            mode="primary"
            theme={'brand'}
            disabled={!acceptTerms}
            size="sm"
            className="w-fit px-4"
          >
            {mode === 'buy' ? 'ادامه خرید' : 'ادامه فروش'}
          </Button>
          <Button
            mode="secondary"
            theme="brand"
            onClick={onClose}
            size="sm"
            className="w-fit px-4"
          >
            بازگشت
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

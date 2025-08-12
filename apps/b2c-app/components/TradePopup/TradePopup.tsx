'use client';
import React from 'react';
import {
  Dialog,
  Button,
  Icon,
  Badge,
  Checkbox,
  OptionsDropdown,
} from 'design-system';
import { cn } from 'design-system';
import {
  formatNumber,
  getQuantityInPersianWords,
  persianToEnglishDigits,
  useTradeQuantity,
  TradePopupProps,
} from './utils';

export const TradePopup: React.FC<TradePopupProps> = ({
  isOpen,
  onClose,
  fundName = 'مشترک افق روشن کارگزاری بانک خاورمیانه',
  estismatedBuyPrice = 15000000,
  estismatedUnit = 1000,
  mode = 'buy',
  badge = {
    theme: 'green',
    title: 'سهامی',
  },
  disableCheck = false,
}) => {
  const {
    quantityOptions,
    setQuantityStep,
    quantity,
    setQuantity,
    acceptTerms,
    setAcceptTerms,
    incrementQuantity,
    decrementQuantity,
  } = useTradeQuantity(153000000, disableCheck);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="bg-surface-neutral-primary w-[542px] border-0 p-0 pb-8"
    >
      {/* Fund Name */}
      <div className="h-[72px] w-full">
        <div className="inline-flex h-[62px] w-full items-center justify-between gap-2 px-6 py-2">
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
            {mode === 'buy' ? (
              <>
                <span className="text-text-neutral-secondarycontrast text-right text-xs font-medium">
                  گام تغییر
                </span>
                <div>
                  <OptionsDropdown
                    initialSelectedIndex={0}
                    triggerClassName="w-[107px]"
                    dropDownStyles={{
                      bg: 'primary',
                      emphasize: 'high',
                      size: 'md',
                      anchor: 'bottom start',
                    }}
                    dropDownList={quantityOptions.map((option, index) => ({
                      text: formatNumber(option),
                      id: index,
                    }))}
                    onChange={(selectedtItem, id) =>
                      setQuantityStep(quantityOptions[id ?? 0])
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex w-[107px] pt-7">
                  <Button
                    mode="primary"
                    theme="brand"
                    size="sm"
                    className="w-14"
                    onClick={() => {
                      // Set quantity to estimated unit value (maximum available for selling)
                      setQuantity(estismatedUnit * estismatedBuyPrice);
                    }}
                  >
                    همه
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-row items-center justify-center gap-4 px-6 pt-4">
            {mode === 'buy' && (
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
            )}

            {/* Price Display */}
            <div
              className={cn(
                'text-text-neutral-primary flex w-full items-center text-[32px] font-medium',
                mode === 'sell' && 'w-[280px] justify-center',
              )}
            >
              <input
                type="text"
                inputMode="numeric"
                className={cn(
                  'min-w-0 bg-transparent text-[32px] font-medium outline-none',
                  mode === 'sell' ? 'text-center' : 'text-left',
                )}
                style={{
                  width: `${Math.max(formatNumber(quantity).length * 1.1 + 1.5, 3)}ch`,
                }}
                value={formatNumber(quantity)}
                onChange={(e) => {
                  let val = e.target.value
                    .replace(/[^0-9\u06F0-\u06F9,]/g, '') // Allow digits and commas
                    .replace(/,/g, ''); // Remove commas
                  val = persianToEnglishDigits(val);
                  setQuantity(val === '' ? 0 : Number(val));
                }}
              />
              <span className="text-text-neutral-secondary mr-1 text-sm font-normal">
                ریال
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="bg-surface-neutral-secondary text-text-neutral-secondary rounded-md px-2 pt-1 text-xs font-medium">
            {getQuantityInPersianWords(quantity)}
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
            {formatNumber(estismatedBuyPrice)} ریال
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-neutral-secondarycontrast">
            حدود تعداد واحد:
          </span>
          <span className="text-text-neutral-primary font-medium">
            {formatNumber(estismatedUnit)} واحد
          </span>
        </div>
      </div>

      {/* Terms Checkbox */}
      <div className="flex w-full items-start px-6">
        <Checkbox
          checked={acceptTerms}
          disabled={disableCheck}
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
    </Dialog>
  );
};

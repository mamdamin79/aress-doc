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
import { TradePopupInfos } from './TradePopupInfos';

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
  } = useTradeQuantity(0, disableCheck);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="bg-surface-neutral-primary w-[542px] border-0 p-0 pb-8"
    >
      {/* Fund Name */}
      <div className="border-border-neutral-primary w-full border-b-2 pb-1 pt-3">
        <div className="inline-flex h-[62px] w-full items-center gap-3 px-6 py-2">
          <div className="flex flex-row items-center gap-2">
            <div className="bg-surface-neutral-secondary h-[38px] w-[38px] rounded-full"></div>
            <span className="text-sm font-medium">{fundName}</span>
          </div>
          <Badge {...badge} />
        </div>
      </div>

      {/* Investment Amount Input */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <span className="text-text-neutral-secondarycontrast text-sm font-medium">
          مبلغ سرمایه‌گذاری را وارد کنید.
        </span>
        <div className="mt-8 flex w-full flex-row justify-center">
          <div className="relative flex w-full flex-row items-center justify-center gap-4">
            {mode === 'buy' && (
              <>
                <Button
                  theme="brand"
                  mode="primary"
                  size="sm"
                  className="absolute right-6 top-0 h-8 w-9"
                  onClick={incrementQuantity}
                >
                  <Icon name="plus" size="md" />
                </Button>
                <Button
                  theme="brand"
                  mode="secondary"
                  size="sm"
                  className="absolute left-6 top-0 h-8 w-9"
                  onClick={decrementQuantity}
                >
                  <Icon name="minus" size="md" />
                </Button>
              </>
            )}
            {/* All button  */}
            {mode === 'sell' && (
              <div className="absolute right-6 top-1 flex w-[107px]">
                <Button
                  mode="primary"
                  theme="brand"
                  size="sm"
                  disabled={quantity === 400}
                  className="w-14"
                  onClick={() => {
                    setQuantity(400);
                  }}
                >
                  همه
                </Button>
              </div>
            )}

            {/* Price Display */}
            <div className="flex w-full items-center justify-center">
              <div className="ml-7 flex items-center gap-1">
                <input
                  type="text"
                  inputMode="numeric"
                  dir="ltr"
                  style={{
                    width: `${Math.max(formatNumber(quantity).length * 1.1 + 1.5, 3)}ch`,
                  }}
                  className={cn(
                    'bg-transparent text-left text-[32px] font-medium outline-none',
                  )}
                  value={formatNumber(quantity)}
                  onChange={(e) => {
                    let val = e.target.value
                      .replace(/[^0-9\u06F0-\u06F9,]/g, '')
                      .replace(/,/g, '');
                    val = persianToEnglishDigits(val);
                    setQuantity(val === '' ? 0 : Number(val));
                  }}
                />
                <span className="text-text-neutral-secondary text-sm font-normal">
                  {mode === 'buy' ? 'ریال' : 'واحد'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-1 flex w-full justify-center">
          <div className="bg-surface-neutral-secondary text-text-neutral-secondary rounded-md px-2 pt-1 text-right text-xs font-medium">
            {mode === 'buy'
              ? getQuantityInPersianWords(quantity)
              : `دارایی قابل فروش: 400 واحد`}
          </div>
        </div>
        {/* Quantity Controls */}
        <div className="mt-3 flex w-full flex-row items-center justify-between px-6">
          {mode === 'buy' && (
            <>
              <span className="text-text-neutral-secondarycontrast text-right text-sm">
                گام تغییر را انتخاب کنید
              </span>
              <div>
                <OptionsDropdown
                  shadow={true}
                  initialSelectedIndex={0}
                  triggerClassName="w-[107px] justify-center text-center border-border-neutral-primary active:border-border-primary-600"
                  dropDownStyles={{
                    fixedWidth: 107,
                    bg: 'secondary',
                    emphasize: 'high',
                    size: 'sm',
                    anchor: 'bottom start',
                  }}
                  className="shadow-7xl"
                  optionClassName="text-center justify-center"
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
          )}
        </div>
      </div>

      {/* Investment Limits */}
      <div className="mt-10 space-y-2 px-6">
        <div className="flex items-center justify-between text-sm">
          <div className="text-text-neutral-secondarycontrast flex items-center gap-2">
            <TradePopupInfos selectedItemIndex={mode === 'buy' ? 0 : 2}>
              <Icon name="info" size="sm" />
            </TradePopupInfos>
            {mode === 'buy' ? (
              <span>حدود قیمت خرید</span>
            ) : (
              <span>حدود قیمت فروش هر واحد</span>
            )}
          </div>
          <span className="text-text-neutral-primary font-medium">
            {formatNumber(estismatedBuyPrice)} ریال
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="text-text-neutral-secondarycontrast flex items-center gap-2">
            <TradePopupInfos selectedItemIndex={mode === 'buy' ? 1 : 3}>
              <Icon name="info" size="sm" />
            </TradePopupInfos>{' '}
            {mode === 'buy' ? (
              <span>حدود تعداد واحد</span>
            ) : (
              <span>حدود مبلغ واریزی</span>
            )}
          </div>
          <span className="text-text-neutral-primary font-medium">
            {formatNumber(estismatedUnit)} {mode === 'buy' ? 'واحد' : 'ریال'}
          </span>
        </div>
      </div>

      {/* Terms Checkbox */}
      <div className="mt-10 flex w-full items-start px-6">
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
      <div className="mt-6 flex w-full justify-end gap-2 px-6">
        <Button
          mode="primary"
          theme={mode === 'buy' ? 'success' : 'error'}
          disabled={!acceptTerms || quantity === 0}
          size="sm"
          className="w-fit px-4"
        >
          {mode === 'buy' ? 'ادامه خرید' : 'ادامه فروش'}
        </Button>
        <Button
          mode="secondary"
          theme={'brand'}
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

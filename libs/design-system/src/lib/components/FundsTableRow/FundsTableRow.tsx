'use client';
import { cn } from './../../../utils/classNames.utils';
import { Icon } from '../Icon';
import { OptionsDropdown } from '../OptionsDropdown';
import { Tooltip } from '../Tooltip';
import { useState } from 'react';
import { useCustomToast } from 'libs/design-system/src/hooks/CustomToast/CustomToast';
import { Toaster } from 'react-hot-toast';

interface Props {
  name: string;
  logo: string;
  pined: boolean;
  selected: boolean;
  isScrolled: boolean;
  className?: string;
  investmentMethod: 'T' | 'I&C';
  pinedFunction: () => void;
  category: 'stocks' | 'watchlist';
  unPinedFunction: () => void;
  toggleWatchList: () => void;
  canPin: boolean;
  tag: boolean;
}

export function FundsTableRow({
  name,
  investmentMethod,
  tag,
  toggleWatchList,
  unPinedFunction,
  category,
  pinedFunction,
  logo,
  canPin,
  pined,
  selected,
  isScrolled,
  className,
}: Props) {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const { showProgressToast, showToast } = useCustomToast();

  return (
    <div
      className={cn(
        'sticky right-0 top-0 py-0 m-0 flex bg-white h-[61px] w-fit items-center justify-between p-0',
        className,
        {
          'shadow-[-4px_0px_6px_0px_rgba(0,11,23,0.05)]': isScrolled,
          'bg-blue-50 group-hover:bg-blue-100': pined,
          'bg-blue-200': selected,
          'bottom-0 group-hover:bg-blue-50': !selected && !pined,
        },
      )}
    >
      <div className="relative h-full flex items-center gap-2 px-2">
        <div
          className={cn(
            'bg-vividGreen-600 invisible box-content h-2.5 w-2.5 rounded-full border-2 border-white',
            {
              visible: tag,
            },
          )}
        ></div>
        <div className="group/img">
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img src={logo} alt="logo fund" />
          </div>

          <div className="absolute right-4 top-8 transition-all duration-500 group-hover/img:-translate-x-[12.5px] group-hover/img:-translate-y-[17px]">
            <Tooltip
              position="left"
              title={
                canPin
                  ? pined
                    ? 'برداشتن پین'
                    : 'پین کردن صندوق'
                  : pined
                    ? 'برداشتن پین'
                    : ''
              }
            >
              <div
                onClick={() => {
                  if (!canPin && !pined)
                    showToast({
                      message:
                        'حداکثر میتوانید ۳ صندوق را در هر دسته بندی پین کنید.',
                      type: 'warning',
                    });
                  if (canPin && !pined) {
                    pinedFunction();
                    showProgressToast({
                      title: 'صندوق مورد نظر پین شد.',
                      timeout: 3000,
                    });
                  }

                  if (pined) {
                    unPinedFunction();
                    showProgressToast({
                      title: 'صندوق از لیست پین شده‌ها خارج شد.',
                      timeout: 3000,
                      leadingAction: {
                        iconProps: { name: 'undo-2', size: 'sm' },
                        onClick: () => pinedFunction(),
                      },
                    });
                  }
                }}
                className={cn(
                  'hidden h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full bg-white duration-500 group-hover/img:flex group-hover/img:h-[33px] group-hover/img:w-[33px]',
                  {
                    flex: pined,
                    'border border-[#B3B6BD]': !canPin && !pined,
                  },
                )}
              >
                <div
                  className={cn(
                    'flex rotate-45 items-center justify-center text-black',
                    {
                      'rotate-0 text-blue-700 group-hover/img:hidden': pined,
                      'rotate-[35deg] text-[#B3B6BD]': !canPin && !pined,
                    },
                  )}
                >
                  <Icon name="pin" size="md" />
                </div>

                {pined && (
                  <div className="hidden rotate-45 items-center justify-center text-blue-700 group-hover/img:flex">
                    <Icon name="pin-off" size="md" />
                  </div>
                )}
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Tooltip offset={2} position="bottom" title={name.length > 29 ? name : ''}>
            <p className="text-gray-1000 w-[201px] hover:text-[#0F7575] truncate text-right text-sm font-medium">
              {name}
            </p>
          </Tooltip>
          <span className={cn("border-vividGreen-200 select-none w-fit text-[#058F3C] bg-vividGreen-100 rounded-sm border px-2 pt-0.5 h-[25px] text-xs font-medium", {
            'border-[#B3B6BD] bg-[#F3F4F6] text-[#74777C]': investmentMethod === 'T'
          })}>
            ETF
          </span>
        </div>
      </div>

      <OptionsDropdown
        className='!border-[#D1D3D7] shadow-7xl'
        dropDownStyles={{
          anchor: 'bottom start',
          size: 'md',
          bg: 'primary',
          emphasize: 'medium',
        }}
        dropDownList={[
          { text: 'مشاهده صندوق', icon: { name: 'eye', size: 'md' } },
          { text: 'مشاهده ویدیو', icon: { name: 'video', size: 'md' } },
          { text: 'نشان‌دار کردن', icon: { name: 'target', size: 'md' } },
          {
            text: pined ? 'برداشتن پین' : 'پین کردن',
            icon: { name: pined ? 'pin-off' : 'pin', size: 'md' },
          },
          {
            text:
              category === 'stocks'
                ? 'افزودن به دیده‌بان'
                : 'حذف از دیده‌بان',
            icon: {
              name: category === 'stocks' ? 'plus' : 'minus',
              size: 'md',
            },
          },
        ]}
        customTriggerRender={(prop) => {
          if (isDropdownActive !== prop.isActive) {
            queueMicrotask(() => setIsDropdownActive(prop.isActive));
          }
          return (
            <div
              className={cn(
                'invisible cursor-pointer rounded-full p-1.5 group-hover:visible',
                {
                  'hover:border-brand-600 border border-blue-200': selected,
                  'hover:border-brand-600 border border-blue-100': pined,
                  'hover:border-brand-600 border border-white hover:bg-white':
                    !selected && !pined,
                  'visible border border-blue-200': prop.isActive,
                },
              )}
            >
              <Icon name="ellipsis-vertical" />
            </div>
          );
        }}
        customOptionRender={(prop) => {
          return (
            <div
              onClick={() => {
                if (!canPin && prop.text === 'پین کردن') {
                  showToast({
                    message:
                      'حداکثر میتوانید ۳ صندوق را در هر دسته بندی پین کنید.',
                    type: 'warning',
                  });                }
                if (prop.text === 'پین کردن' && canPin) {
                  pinedFunction();
                  showProgressToast({
                    timeout: 5000,
                    title: 'صندوق مورد نظر پین شد.',
                  });
                }
                if (prop.text === 'برداشتن پین') {
                  unPinedFunction();
                  showProgressToast({
                    title: 'صندوق از لیست پین شده‌ها خارج شد.',
                    timeout: 3000,
                    leadingAction: {
                      iconProps: { name: 'undo-2', size: 'sm' },
                      onClick: () => pinedFunction(),
                    },
                  });
                }

                if (prop.text === 'افزودن به دیده‌بان') {
                  toggleWatchList();
                  showProgressToast({
                    title: 'صندوق مورد نظر به دیده بان اضافه شد.',
                    timeout: 3000,
                  });
                }
                if (prop.text === 'حذف از دیده‌بان') {
                  showProgressToast({
                    title: 'صندوق مورد نظر از دیده بان حذف شد.',
                    timeout: 3000,
                    leadingAction: {
                      iconProps: { name: 'undo-2', size: 'sm' },
                      onClick: () => toggleWatchList(),
                    },
                  });
                  toggleWatchList();
                }
              }}
              className={cn(
                'flex cursor-pointer font-medium w-[168px] pr-2 text-sm hover:text-brand-800 items-center gap-2 bg-white py-2',
                {
                  'cursor-default hover:text-nowrap hover:text-[#B3B6BD] text-[#B3B6BD]':
                    !canPin && prop.text === 'پین کردن',
                },
              )}
            >
              {prop.icon?.name && (
                <div
                  className={cn({
                    'rotate-[25deg]':
                      prop.icon.name === 'pin-off' || prop.icon.name === 'pin',
                  })}
                >
                  <Icon name={prop.icon?.name} size={prop.icon?.size} />
                </div>
              )}
              <span>{prop.text}</span>
            </div>
          );
        }}
      />
      <Toaster
        position="bottom-center"
        containerStyle={{
          bottom: 70,
        }}
      />
    </div>
  );
}

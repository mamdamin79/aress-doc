'use client';
import { cn } from '../../../utils/classNames.utils';
import { Icon } from '../Icon';
import { OptionsDropdown } from '../OptionsDropdown';
import { Tooltip } from '../Tooltip';
import { useState } from 'react';
import { useCustomToast } from 'libs/design-system/src/hooks/CustomToast/CustomToast';

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

export function FundsInfoCell({
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
  // const [isDropdownActive, setIsDropdownActive] = useState(false);

  // const { showProgressToast, showToast } = useCustomToast();

  return (
    <div
      className={cn(
        'sticky right-0 top-0 py-0 m-0 flex bg-white h-[45px] w-[384px] items-center justify-between p-0',
        className,
        {
          'shadow-[-4px_0px_6px_0px_rgba(0,11,23,0.05)]': isScrolled,
          'bg-blue-50 group-hover:bg-blue-100': pined,
          'bg-blue-200': selected,
          'bottom-0 group-hover:bg-blue-50': !selected && !pined,
        },
      )}
    >
      <div className="relative pr-6 pl-2 h-full flex items-center gap-2">
        <span className={cn("border-[#ACF1C7] select-none w-fit text-[#058F3C] bg-[#D2FEE4] rounded-sm border px-2 pt-0.5 h-[25px] text-xs font-medium", {
          'border-[#B3B6BD] bg-[#F3F4F6] text-[#74777C]': investmentMethod === 'T'
        })}>
          ETF
        </span>
                <span className={cn("border-[#ACF1C7] whitespace-nowrap select-none w-fit text-[#058F3C] bg-[#D2FEE4] rounded-sm border px-2 h-[25px] text-xs font-medium", {
          'border-[#B3B6BD] bg-[#F3F4F6] text-[#74777C]': investmentMethod === 'T'
        })}>
          قابل خرید
        </span>
        <div
          className={cn(
            'bg-vividGreen-600 invisible box-content h-2.5 w-2.5 rounded-full border-2 border-white',
            {
              visible: tag,
            },
          )}
        ></div>
        <div className="group/img relative">
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img src={logo} alt="logo fund" />
          </div>
          {pined &&
            <div className="absolute -right-1 top-5">
              <div
                className='flex items-center justify-center text-black'
              >
                <Icon name="CustomPin" size="sm" />
              </div>
            </div>
          }
        </div>
        {/* <Tooltip offset={2} position="left" title={name.length > 13 ? name : ''}>
          <p className="text-gray-1000 w-[130px] hover:text-[#0F7575] truncate text-right text-sm font-medium">
            {name}
          </p>
        </Tooltip> */}
      </div>
      {/* <OptionsDropdown
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
                'invisible w-8 h-8 ml-1 flex justify-center items-center cursor-pointer rounded-full p-1.5 hover:bg-white group-hover:visible',
                {
                  'hover:border-brand-600 border border-blue-200': selected,
                  'hover:border-brand-600 border border-blue-100': pined,
                  'hover:border-brand-600 border border-white hover:bg-white':
                    !selected && !pined,
                  'visible border border-[#0C9292] bg-white': prop.isActive,
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
                  });
                }
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
      /> */}
    </div>
  );
}

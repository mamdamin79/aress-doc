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
        'sticky right-0 flex min-h-[70px] w-fit items-center justify-between border-t border-blue-100 bg-white',
        className,
        {
          'shadow-md': isScrolled,
          'bg-blue-50 group-hover:bg-blue-100': pined,
          'bg-blue-200': selected,
          'group-hover:bg-blue-50': !selected && !pined,
        },
      )}
    >
      <div className="relative flex items-center gap-2 px-2 py-1">
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
          
          <div className={cn("absolute right-4 top-9 transition-all duration-500 group-hover/img:-translate-x-[12.5px] group-hover/img:-translate-y-[32.5px]", {
            'group-hover/img:-translate-y-[19.5px]': investmentMethod === 'T',
            'top-5 group-hover/img:top-9': investmentMethod !== 'T' && pined,
          })}>
            <Tooltip
              className='z-50'
              position="top"
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
                  'hidden h-[33px] w-[33px] cursor-pointer items-center justify-center rounded-full bg-white text-blue-700 duration-500 group-hover/img:flex',
                  {
                    flex: pined,
                  },
                )}
              >
                <div
                  className={cn('flex items-center justify-center', {
                    'group-hover/img:hidden': pined,
                    'rotate-45 text-gray-100': !canPin && !pined,
                  })}
                >
                  <Icon name="pin" size="md" />
                </div>

                {pined && (
                  <div className="hidden items-center justify-center group-hover/img:flex">
                    <Icon name="pin-off" size="md" />
                  </div>
                )}
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Tooltip offset={2} position="bottom" className="!z-50" title={name}>
            <p
              className={cn(
                'text-gray-1000 w-[235px] truncate text-right text-sm font-medium group-hover:w-[202px]',
                {
                  'w-[202px]': isDropdownActive,
                },
              )}
            >
              {name}
            </p>
          </Tooltip>
          <div className="flex items-center gap-1 text-xs font-medium">
            {investmentMethod === 'T' && (
                <div className="border-vividGreen-200 text-vividGreen-800 bg-vividGreen-100 rounded-sm border px-2 py-0.5">
                  ETF
                </div>
            )}
          </div>
        </div>
      </div>

      <OptionsDropdown
        dropDownStyles={{
          anchor: 'bottom start',
          size: 'md',
          bg: 'primary',
          emphasize: 'medium',
        }}
        dropDownList={[
          { text: 'مشاهده صندوق', icon: { name: 'eye', size: 'md' } },
          { text: 'مشاهده ویدیو', icon: { name: 'video', size: 'md' } },
          { text: 'نشان دار کردن', icon: { name: 'target', size: 'md' } },
          {
            text: pined ? 'برداشتن پین' : 'پین کردن',
            icon: { name: pined ? 'pin-off' : 'pin', size: 'md' },
          },
          {
            text:
              category === 'stocks'
                ? 'اضافه کردن به دیده بان'
                : 'حذف از دیده بان',
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
                'hidden cursor-pointer rounded-full p-1.5 group-hover:block',
                {
                  'hover:border-brand-600 border border-blue-200': selected,
                  'hover:border-brand-600 border border-blue-100': pined,
                  'hover:border-brand-600 border border-white hover:bg-white':
                    !selected && !pined,
                  block: prop.isActive,
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
                  return;
                }
                if (prop.text === 'پین کردن') {
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

                if (prop.text === 'اضافه کردن به دیده بان') {
                  toggleWatchList();
                  showProgressToast({
                    title: 'صندوق مورد نظر به دیده بان اضافه شد.',
                    timeout: 3000,
                  });
                }
                if (prop.text === 'حذف از دیده بان') {
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
                'flex cursor-pointer items-center gap-2 bg-white px-3 py-2',
                {
                  'cursor-default text-gray-100':
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
      ></OptionsDropdown>
      <Toaster
        position="bottom-center"
        containerStyle={{
          bottom: 70,
        }}
      />
    </div>
  );
}

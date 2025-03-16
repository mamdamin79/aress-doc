import { cn } from './../../../utils/classNames.utils';
import { Icon } from '../Icon';
import { OptionsDropdown } from '../OptionsDropdown';
import { Tooltip } from '../Tooltip';
import { useState } from 'react';

interface Props {
  name: string;
  logo: string;
  pined: boolean;
  selected: boolean;
  isScrolled: boolean;
  className?: string;
  hasVideo: boolean;
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
  hasVideo,
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
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={cn(
        'sticky right-0 flex min-h-[70px] w-fit items-center justify-between bg-white',
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
          <div
            className='absolute right-4 top-9 transition-all duration-500 group-hover/img:-translate-x-[13px] group-hover/img:-translate-y-[19.5px]'
          >
            <div
              onClick={() => {
                pined ? unPinedFunction() : pinedFunction();
              }}
              className={cn(
                'hidden h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-blue-700 duration-500 group-hover/img:flex',
                {
                  flex: pined,
                },
              )}
            >
              <div
                className={cn("flex items-center justify-center", {
                  'group-hover/img:hidden': pined,
                })}
              >
                <Icon name="pin" size="md" />
              </div>

              {pined && (
                <div
                  className="hidden items-center justify-center group-hover/img:flex"
                >
                  <Icon name="pin-off" size="md" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Tooltip offset={2} position="bottom" className="!z-50" title={name}>
            <p
              className={cn(
                'text-gray-1000 w-[235px] truncate text-right text-sm font-medium group-hover:w-[202px]',
                {
                  'w-[202px]': isSelected,
                },
              )}
            >
              {name}
            </p>
          </Tooltip>
          <div className="flex items-center gap-1 text-xs font-medium">
            {investmentMethod === 'T' && (
              <>
                <div className="rounded-sm border bg-purple-100 px-2">
                  قابل معامله
                </div>
                <div className="border-vividGreen-200 text-vividGreen-800 bg-vividGreen-100 rounded-sm border px-2 py-0.5">
                  ETF
                </div>
              </>
            )}
            <Tooltip title={hasVideo ? 'مشاهده ویدیو' : ''}>
              <div
                className={cn(
                  'bg-vividGreen-100 text-vividGreen-800 border-vividGreen-200 w-fit cursor-pointer rounded-sm border px-2 py-0.5',
                  {
                    'cursor-default border-gray-100 bg-white text-gray-200':
                      !hasVideo,
                  },
                )}
              >
                <Icon name="video" />
              </div>
            </Tooltip>
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
            text: pined ? 'برداشتن سنجاق' : 'سنجاق کردن',
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
          setIsSelected(prop.isActive);
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
                prop.text === 'سنجاق کردن' && pinedFunction();
                prop.text === 'برداشتن سنجاق' && unPinedFunction();
                (prop.text === 'اضافه کردن به دیده بان' ||
                  prop.text === 'حذف از دیده بان') &&
                  toggleWatchList();
              }}
              className={cn(
                'flex cursor-pointer items-center gap-2 bg-white px-3 py-2',
                {
                  'cursor-default text-gray-100':
                    !canPin && prop.text === 'سنجاق کردن',
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
    </div>
  );
}

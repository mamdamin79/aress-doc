import { cn } from './../../../utils/classNames.utils';
import { TableCell } from './FundsTableCell';
import { Icon } from '../Icon';
import { OptionsDropdown } from '../OptionsDropdown';

interface Props {
  name: string;
  logo: string;
  pined: boolean;
  selected: boolean;
  isScrolled: boolean;
}

export function FundsTableRow({
  name,
  logo,
  pined,
  selected,
  isScrolled,
}: Props) {
  return (
    <div
      className={cn(
        'sticky right-0 w-[300px] flex h-full items-center justify-between bg-white',
        {
          'shadow-md': isScrolled,
          'bg-blue-50 group-hover:bg-blue-100': pined,
          'bg-blue-200': selected,
          'group-hover:bg-blue-50': !selected && !pined,
        },
      )}
    >
      <div className="relative flex items-center gap-2 px-2 py-1">
        <div className="rounded-full bg-indigo-600 p-1.5"></div>
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <img src={logo} alt="logo fund" />
        </div>
        {pined && (
          <div className="absolute right-4 top-9 rounded-full bg-white p-0.5 text-blue-700">
            <Icon name="pin" size="md" />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-gray-1000 text-base font-medium">{name}</span>
          <div className="flex items-center gap-1">
            <div className="rounded-sm border bg-purple-100 px-2">
              قابل معامله
            </div>
            <div className="rounded-sm border border-vividGreen-200 px-2 text-vividGreen-500 bg-vividGreen-100">ETF</div>
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
          { text: 'حذف از دیده بان', icon: { name: 'minus', size: 'md' } },
        ]}
        customTriggerRender={(prop) => {
          return (
            <div
              className={cn('cursor-pointer hidden group-hover:block rounded-full p-1.5', {
                'hover:border-brand-600 border border-blue-200': selected,
                'hover:border-brand-600 border border-blue-100': pined,
                'hover:border-brand-600 border border-white hover:bg-white':
                  !selected && !pined,
                'block': prop.isActive
              })}
            >
              <Icon name="ellipsis-vertical" />
            </div>
          );
        }}
        customOptionRender={(prop) => {
          return (
            <div className="flex cursor-pointer items-center gap-2 bg-white px-3 py-2">
              {prop.icon?.name && (
                <div
                  className={cn({
                    'rotate-[25deg]':
                      prop.icon.name === 'pin-off' ||
                      prop.icon.name === 'pin',
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

import React from 'react';
import { NestedDropdown } from '../NestedDropdown';
import { Button } from '../Button';
import { cn } from 'libs/design-system/src/utils';
import {
  NestedDropdownItemProps,
  NestedDropdownProps,
} from '../NestedDropdown/NestedDropdown.types';
import { NestedDropdownItem } from '../NestedDropdown/NestedDropdownItem';

type optionProps = {
  type:
    | 'basicSelection'
    | 'extendedSelection'
    | 'categorizedSelection'
    | 'nestedDropdown';
  props: NestedDropdownProps | NestedDropdownItemProps;
};

interface ReportSettingsProps {
  options: optionProps[];
  onSubmit: () => void;
  onClose: () => void;
}

export const ReportSettings: React.FC<ReportSettingsProps> = ({
  options,
  onClose,
  onSubmit,
}) => {
  return (
    <div className={cn('bg-baseBackground flex h-80 w-[328px] flex-col')}>
      <div className="text-md w-full py-2 pr-4 font-medium">تنظیمات گزارش</div>
      <div
        className={cn(
          'flex h-[236px] flex-col pl-5 pr-4',
          'custom-scrollbar overflow-y-auto overflow-x-hidden',
        )}
      >
        {options.map((option: optionProps, index: number) => {
          if (option.type === 'nestedDropdown') {
            return (
              <NestedDropdown
                key={index}
                {...(option.props as NestedDropdownProps)}
              />
            );
          } else if (option.type === 'basicSelection') {
            return (
              <div className="mb-4" key={index}>
                <NestedDropdownItem
                  {...(option.props as NestedDropdownItemProps)}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="flex w-full flex-row gap-1 text-nowrap pb-4 pl-4 pr-[175px] text-xs font-semibold">
        <Button
          align="center"
          isLoading={false}
          mode="secondary"
          size="sm"
          onClick={onClose}
        >
          انصراف
        </Button>
        <Button
          align="center"
          isLoading={false}
          mode="primary"
          size="sm"
          onClick={onSubmit}
        >
          اعمال تغییرات
        </Button>
      </div>
    </div>
  );
};

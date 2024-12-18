import React, { useEffect } from 'react';
import { NestedDropdown } from '../NestedDropdown';
import { NestedDropDownProps } from '../NestedDropdown/NestedDropdown.types';
import { CustomScrollbar } from './CustomScrollBar';
import { Field, FieldProps } from '../NestedDropdown/Field/Field';
import { Button } from '../Button';
import { cn } from 'libs/design-system/src/utils';

type optionProps = {
  type:
    | 'basicSelection'
    | 'extendedSelection'
    | 'categorizedSelection'
    | 'nestedDropdown';
  props: NestedDropDownProps | FieldProps;
};

interface ReportSettingsProps {
  options: optionProps[];
  isOpen: boolean;
  onClose: () => void;
}

export const ReportSettings: React.FC<ReportSettingsProps> = ({
  options,
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={cn(
        'bg-baseBackground flex h-80 w-[328px] flex-col rounded-bl-2xl rounded-tl-2xl shadow-lg transition-all duration-300 ease-in-out',
        isOpen
          ? 'visible translate-x-0 transform opacity-100'
          : 'invisible w-0 -translate-x-5 transform opacity-0',
      )}
    >
      <div className="text-md w-full py-2 pr-4 font-medium">تنظیمات گزارش</div>
      <CustomScrollbar
        className={cn('flex h-[236px] flex-col pl-5 pr-4', 'overflow-y-auto')}
      >
        {options.map((option: optionProps, index: number) => {
          if (option.type === 'nestedDropdown') {
            return (
              <NestedDropdown
                key={index}
                {...(option.props as NestedDropDownProps)}
              />
            );
          } else if (option.type === 'basicSelection') {
            return (
              <div className="mb-4" key={index}>
                <Field {...(option.props as FieldProps)} />
              </div>
            );
          }
          return null;
        })}
      </CustomScrollbar>
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
        <Button align="center" isLoading={false} mode="primary" size="sm">
          اعمال تغییرات
        </Button>
      </div>
    </div>
  );
};

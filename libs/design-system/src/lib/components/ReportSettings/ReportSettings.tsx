import React from 'react';
import { NestedDropdown } from '../NestedDropdown';
import { Button } from '../Button';
import { cn } from 'libs/design-system/src/utils';
import {
  NestedDropdownItemProps,
  NestedDropdownProps,
} from '../NestedDropdown/NestedDropdown.types';
import { NestedDropdownItem } from '../NestedDropdown/NestedDropdownItem';
import { OptionsListExplorerProps } from '../OptionsListExplorer/OptionsListExplorer';

export type optionProps = {
  type: 'basicSelection' | 'nestedDropdown';
  props: NestedDropdownProps | NestedDropdownItemProps;
};

interface ReportSettingsProps {
  options: optionProps[];
  onSubmit: () => void;
  onClose: () => void;
  onChangeOptionsListExplorerItem: (
    selectedList: OptionsListExplorerProps,
  ) => void;
}

export const ReportSettings: React.FC<ReportSettingsProps> = ({
  options,
  onClose,
  onSubmit,
  onChangeOptionsListExplorerItem,
}) => {
  return (
    <div className={cn('bg-surface-neutral-primary flex h-full flex-col')}>
      <div className="text-md w-full py-2 pr-4 font-medium">تنظیمات گزارش</div>
      <div
        className={cn(
          'ml-1 flex flex-col gap-1 pl-4 pr-4',
          'scrollbar-sm-hidden h-full overflow-x-hidden',
        )}
      >
        {options.map((option: optionProps, index: number) => {
          if (option.type === 'nestedDropdown') {
            const castedProps = option.props as NestedDropdownProps;
            return (
              <NestedDropdown
                key={index}
                {...castedProps}
                onChildClick={(list) => onChangeOptionsListExplorerItem(list)}
              />
            );
          } else if (option.type === 'basicSelection') {
            const castedProps = option.props as NestedDropdownItemProps;
            return (
              <div className="mb-4" key={index}>
                <NestedDropdownItem
                  {...castedProps}
                  onClick={() =>
                    onChangeOptionsListExplorerItem(
                      castedProps.optionsListProps,
                    )
                  }
                />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="flex w-full flex-row gap-1 text-nowrap pb-4 pl-4 pr-[175px] pt-2 text-xs font-semibold">
        <Button
          align="center"
          isLoading={false}
          mode="secondary"
          size="sm"
          onClick={onClose}
          className="h-8"
        >
          انصراف
        </Button>
        <Button
          align="center"
          isLoading={false}
          mode="primary"
          size="sm"
          onClick={onSubmit}
          className="h-8"
        >
          اعمال تغییرات
        </Button>
      </div>
    </div>
  );
};

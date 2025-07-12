import { OptionItem } from 'libs/design-system/src/lib/components/OptionsListExplorer/OptionsListExplorer.types';
import { FinancialReportFilterApiModel } from '@openapi';
import { IconName } from 'libs/design-system/src/lib/components/Icon/Icon.types';

export const toOptionListProps = (
  filter: FinancialReportFilterApiModel,
  updateOption: (optionType: string, item: OptionItem) => void
) => ({
  onChange: (item: OptionItem) => updateOption(filter.optionType, item),
  selectedItemId: Number(filter.selectedOption.identifier),
  searchable: filter.searchable,
  title: filter.title,
  items: {
    items: filter.options.map((opt) => ({
      id: Number(opt.identifier),
      title: opt.title,
    })),
  },
});

export const icon = (name: IconName) => ({ name, size: 'sm' as const });

export const toDropdownSetting = (
  filter: FinancialReportFilterApiModel,
  updateOption: (optionType: string, item: OptionItem) => void
) => ({
  type: 'nestedDropdown' as const,
  props: {
    title: filter.parentTitle ?? '',
    items: [
      {
        title: filter.title,
        icon: icon('square-mouse-pointer'),
        status: 'normal' as const,
        selectedOption: filter.selectedOption.title,
        optionsListProps: toOptionListProps(filter, updateOption),
      },
    ],
  },
});

export const toBasicSetting = (
  filter: FinancialReportFilterApiModel,
  updateOption: (optionType: string, item: OptionItem) => void
) => ({
  type: 'basicSelection' as const,
  props: {
    title: filter.title,
    icon: icon('square-mouse-pointer'),
    status: 'normal' as const,
    selectedOption: filter.selectedOption.title,
    optionsListProps: toOptionListProps(filter, updateOption),
  },
});
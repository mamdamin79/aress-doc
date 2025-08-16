export type ChipVariant = 'input' | 'filter';

export type ChipState =
  | 'default'
  | 'hover'
  | 'pressed'
  | 'selected'
  | 'disabled';

export interface ChipItem {
  id: string;
  label: string;
  removable?: boolean;
}

export interface SelectionChipsProps {
  variant: ChipVariant;
  items: ChipItem[];
  selectedItems?: string[];
  onItemClick?: (itemId: string) => void;
  onItemRemove?: (itemId: string) => void;
  disabled?: boolean;
  className?: string;
  showChecked?: boolean;
}

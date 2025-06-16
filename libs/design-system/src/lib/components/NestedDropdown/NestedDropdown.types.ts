import { IconProps } from '../Icon';
import { OptionsListExplorerProps } from '../OptionsListExplorer/OptionsListExplorer';

export interface NestedDropdownItemProps {
  title: string;
  status?: 'normal' | 'opened' | 'error';
  icon: IconProps;
  onClick?: (selectedList: OptionsListExplorerProps) => void;
  activeIcon?: IconProps;
  placeHolder?: string;
  selectedOption?: string;
  hasTooltip?: boolean;
  hasChildren?: boolean;
  optionsListProps: OptionsListExplorerProps;
}

export interface NestedDropdownProps {
  title: string;
  items: NestedDropdownItemProps[];
  onChildClick?: (selectedList: OptionsListExplorerProps) => void;
}

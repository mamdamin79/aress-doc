import { DualSwitchProps } from '../DualSwitch/DualSwitch.types';
import {
  CategoryItem,
  OptionItem,
} from '../OptionsListExplorer/OptionsListExplorer.types';
import { PopupInfoProps } from '../PopupInfo/PopupInfo.types';
type popupInfoItemType = PopupInfoProps['itemsList'];

export interface ReportCardBaseProps {
  title: string;
  switchIcons?: DualSwitchProps;
  optionsListItems?: {
    categories?: CategoryItem[] | null;
    items: OptionItem[];
  };
  compactHeader?: boolean;
  children?: React.ReactNode;
  popupInfoItems?: popupInfoItemType;
}
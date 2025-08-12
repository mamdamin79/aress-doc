import { DualSwitchProps } from '../DualSwitch/DualSwitch.types';
import { PopupInfoProps } from '../PopupInfo/PopupInfo.types';
import { type optionProps } from '../ReportSettings';
export type popupInfoItemType = PopupInfoProps['itemsList'];

export interface ReportCardBaseProps {
  title: string;
  switchIcons?: DualSwitchProps;
  compactHeader?: boolean;
  children?: React.ReactNode;
  popupInfoItems?: popupInfoItemType;
  settingOptions: optionProps[];
  onSubmit?: () => Promise<boolean>;
  onRemove?: () => void;
  onShare?: () => void;
  onReplace?: () => void;
}

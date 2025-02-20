import { DualSwitchProps } from "../DualSwitch/DualSwitch.types";
import { CategoryItem, OptionItem } from "../OptionsListExplorer/OptionsListExplorer.types";

export interface ReportCardBaseProps {
  title: string;
  switchIcons: DualSwitchProps;
  optionsListItems: {
    categories?: CategoryItem[] | null;
    items: OptionItem[];
  };
  showSettingsOnly?: boolean;
}
import { IconName } from '../IconComponent/Icon.types';

export type textFieldPropsType = {
  label?: string;
  placeholder?: string;
  supportText?: string;
  isError?: boolean; // default false
  mode: 'filled' | 'outline'; // default filled
  mergeTitleAndPlaceholder: boolean; // default false
  leadingIcon?: IconName;
  trailingIcons: [] | ['x'] | ['x', 'eye'];
};

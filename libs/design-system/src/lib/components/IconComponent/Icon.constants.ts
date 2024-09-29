import { CustomIconName, IconSize } from './Icon.types';

// values that define in figma for each size(sm,md,lg)
export const sizeValues: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 48,
};

export const strokeValues: Record<IconSize, number> = {
  sm: 1.2,
  md: 1.5,
  lg: 1.8,
  xl: 5.5,
};

export const customIcons: Record<CustomIconName, string> = {
  customCalender: '../../../public/icons/customCalender.svg',
  customIcon2: '/path/to/customIcon2.svg',
  customIcon3: '/path/to/customIcon3.svg',
};

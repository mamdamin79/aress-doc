import { IconSize } from './Icon.types';

// values that define in figma for each size(sm,md,lg)
export const sizeValues: Record<
  IconSize,
  { size: number; strokeWidth: number }
> = {
  sm: { size: 16, strokeWidth: 1.2 },
  md: { size: 20, strokeWidth: 1.5 },
  lg: { size: 24, strokeWidth: 1.8 },
};

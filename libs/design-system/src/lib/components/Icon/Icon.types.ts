import dynamicIconImports from 'lucide-react/dynamicIconImports';

// custom icon valid name
export type CustomIconName =
  | 'CustomCalendar'
  | 'CustomBag'
  | 'CustomBadge'
  | 'CustomBeta'
  | 'CustomCircleSlice'
  | 'CustomWallet'
  | 'CustomScalesOfJustice'
  | 'CustomClock'
  | 'CustomcircularUser'
  | 'CustomClose'
  | 'CustomAlpha';

// this is a type of all valid icon names
export type IconName = keyof typeof dynamicIconImports | CustomIconName;

// valid icon size you can pass to IconComponent
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

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
  | 'CustomCircularUser'
  | 'CustomCirlcleX'
  | 'CustomAlpha'
  | 'CustomPinLinear'
  | 'CustomPlayLinear'
  | 'CustomPinOffLinear'
  | 'CustomPinOffFill'
  | 'CustomPin'
  | 'CustomPlayFill'
  | 'CustomPinFill'
  | 'CustomBookmark'
  | 'CustomArrow'
  | 'CustomTelegram'
  | 'CustomGold';

// this is a type of all valid icon names from lucide
export type IconName = keyof typeof dynamicIconImports | CustomIconName;

// valid icon size you can pass to IconComponent
export type IconSize = 'sm' | 'md' | 'lg' | 'lg_plus' | 'xl';

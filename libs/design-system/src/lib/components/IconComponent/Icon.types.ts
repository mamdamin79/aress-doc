import dynamicIconImports from 'lucide-react/dynamicIconImports';

// test of type custom icons
export type CustomIconName = 'customCalender' | 'customIcon2' | 'customIcon3';

// this is a type of all valid icon names
export type IconName = keyof typeof dynamicIconImports | CustomIconName;

// valid icon size you can pass to IconComponent
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

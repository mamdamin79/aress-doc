import dynamicIconImports from 'lucide-react/dynamicIconImports';

// this is a type of all valid icon names
export type IconName = keyof typeof dynamicIconImports;

// valid icon size you can pass to IconComponent
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

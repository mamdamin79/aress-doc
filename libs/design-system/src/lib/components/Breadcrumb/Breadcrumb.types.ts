import dynamicIconImports from 'lucide-react/dynamicIconImports';

export type IconName = keyof typeof dynamicIconImports;

// this type for BreadcrumbItem
export interface BreadcrumbItem {
  title?: string;
  icon?: IconName;
  link?: string;
}

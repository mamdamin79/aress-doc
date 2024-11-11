import { IconName } from '../IconComponent/Icon.types';

// this type for BreadcrumbItem
export interface BreadcrumbItem {
  title?: string;
  icon?: IconName;
  link?: string;
}

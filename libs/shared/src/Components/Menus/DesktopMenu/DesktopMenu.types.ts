import { MenuTilesProps } from 'design-system';
export interface DropdownGroup {
  groupLabel?: string;
  counter?: boolean;
  children: MenuTilesProps[];
  id?: string;
}
export type dropdownType = DropdownGroup[];

export interface MenuItem {
  text: string;
  link?: string;
  dropdown?: dropdownType;
}

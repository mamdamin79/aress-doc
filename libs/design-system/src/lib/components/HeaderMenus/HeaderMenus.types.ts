import { MenuTilesProps } from '../MenuTiles/MenuTiles.types';
export type dropdownType = {
  groupLabel: string;
  counter?: boolean;
  children: MenuTilesProps[];
}[];
export interface MenuItem {
  text: string;
  link?: string;
  dropdown?: dropdownType;
}

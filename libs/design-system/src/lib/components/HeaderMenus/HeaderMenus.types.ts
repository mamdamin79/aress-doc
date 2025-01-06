import { MenuTilesProps } from '../MenuTiles/MenuTiles.types';

export interface MenuItem {
  name: string;
  link?: string;
  dropdown?: {
    groupLabel: string;
    border?: boolean;
    counter?: boolean;
    children: MenuTilesProps[];
  }[];
}

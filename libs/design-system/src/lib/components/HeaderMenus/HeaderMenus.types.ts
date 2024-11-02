import { MenuTilesProps } from '../MenuTiles/MenuTiles.types';

export interface MenuItem {
  name: string;
  link?: string;
  subMenu?: {
    groupLabel: string;
    border?: boolean;
    counter?: boolean;
    children: MenuTilesProps[];
  }[];
}

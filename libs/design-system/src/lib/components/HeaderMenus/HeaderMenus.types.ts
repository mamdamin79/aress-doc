import { MenuTilesProps } from '../MenuTiles/MenuTiles.types';

export interface MenuItem {
  name: string;
  link?: string;
  dropdown?: {
    groupLabel: string;
    counter?: boolean;
    children: MenuTilesProps[];
  }[];
}

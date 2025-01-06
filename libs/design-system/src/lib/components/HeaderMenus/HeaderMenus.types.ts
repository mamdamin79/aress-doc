import { MenuTilesProps } from '../MenuTiles/MenuTiles.types';
export type subMenu = {
  groupLabel: string;
  border?: boolean;
  counter?: boolean;
  children: MenuTilesProps[];
}[];
interface menuTilesPropsWithSubmenu extends MenuTilesProps {
  subMenu?: subMenu;
}
export interface MenuItem {
  name: string;
  link?: string;
  dropdown?: {
    groupLabel: string;
    border?: boolean;
    counter?: boolean;
    children: menuTilesPropsWithSubmenu[];
  }[];
}

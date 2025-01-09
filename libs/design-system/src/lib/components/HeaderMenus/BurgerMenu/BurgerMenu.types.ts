import { MenuTilesProps } from '../../MenuTiles/MenuTiles.types';
export type BurgerSubMenu = {
  groupLabel: string;
  border?: boolean;
  counter?: boolean;
  children: MenuTilesProps[];
}[];
interface BurgerMenuTilesPropsWithSubmenu extends MenuTilesProps {
  subMenu?: BurgerSubMenu;
}
export interface BurgerMenuItems {
  groupLabel: string;
  counter?: boolean;
  children: BurgerMenuTilesPropsWithSubmenu[];
}

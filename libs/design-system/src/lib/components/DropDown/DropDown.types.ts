export type DropDownPropsType = {
  menuItems: string[] | number[];
  onSelect: (Item: number | string) => void;
  selectedItem: string | number;
};

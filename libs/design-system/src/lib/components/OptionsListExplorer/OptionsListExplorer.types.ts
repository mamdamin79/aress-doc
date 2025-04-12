export interface CategoryItem {
  id: number;
  title: string;
}

export interface OptionItem {
  id: number | string;
  title: string;
  priceChangePercent?: number;
  priceRials?: number;
  type?: string;
  categoryId?: number;
}

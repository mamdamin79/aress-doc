export interface CategoryItem {
  id: number;
  title: string;
}

export interface OptionItem {
  title: string;
  priceChangePercent?: number;
  priceRials?: number;
  type?: string;
  categoryId?: number;
}

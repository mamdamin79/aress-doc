export type DragPosition = 'left' | 'right';
export type Person = {
  nameFund: string;
  unitCount: number;
  profitPerUnit: number;
  netAssetValue: number;
  monstatisticalPriceth: number;
  cancellationPrice: number;
  dailyAlpha: number;
  weeklyAlpha: number;
  monthlyAlpha: number;
  quarterlyAlpha: number;
  issuancePrice: number;
  progress: number;
  monthlyReturn: number;
  quarterlyReturn: number;
  yearlyReturn: number;
  dailyReturn: number;
  weeklyReturn: number;
  startDate: number;
  //   logo: string;
  investmentMethod: 'T' | 'I&C';
};

export interface VirtualItem {
  index: number;
  start: number;
  end: number;
  size: number;
  key: string | number | bigint;
  measureRef?: (el: HTMLElement | null) => void;
}

import { Row } from "@tanstack/react-table";
import type { MutableRefObject } from 'react';

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


export interface FundRow {
  nameFund: string;
  investmentMethod: 'T' | 'I&C';
  logo: string;
  pinned: boolean;
  id: number;
  mark: string;
}

export interface TableBodyProps {
  rows: Row<FundRow>[];
  tableRef: MutableRefObject<HTMLDivElement | null>;
  isScrollAtStart: boolean;
  activeIndexCategoryTab: number;
  handlerPinned: (id: number) => void;
  handlerUnPinned: (id: number) => void;
  handlerMarkFund: (id: number, color: string) => void;
  rowMarks: {id: number, color: string}[];
}


export interface TableRowProps<T extends FundRow> {
  row: Row<T>;
  logo: string;
  handlerMarkFund: (id: number, color: string) => void;
  isMainTab: boolean;
  handlerPinned: (e: number) => void;
  handlerUnPinned: (e: number) => void;
  activeIndexCategoryTab: number;
  rowMarks: {id: number, color: string}[];
  handleColorChange: (id: string, color: string) => void;
  isScrollAtStart: boolean;
}

export interface FundsInfoCellProps {
  name: string;
  logo: string;
  pined: boolean;
  selected: boolean;
  isScrolled: boolean;
  className?: string;
  investmentMethod: 'T' | 'I&C';
  pinedFunction: () => void;
  unPinedFunction: () => void;
  canPin: boolean;
  tag: boolean;
  isRowHovered: boolean;
}

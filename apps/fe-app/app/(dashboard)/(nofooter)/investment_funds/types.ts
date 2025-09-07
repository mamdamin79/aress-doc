import { FundTableItemInfoApiModel, FundTableResponseApiModel } from '@openapi';
import { Row } from '@tanstack/react-table';
import type { RefObject } from 'react';

export type DragPosition = 'left' | 'right';
type tabs = FundTableResponseApiModel['tabs'];
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
  pinned: boolean;
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
  isEtf: boolean;
  isTradable: boolean;
  nameFund: string;
  investmentMethod: 'T' | 'I&C';
  logo: string;
  pinned: boolean;
  id: number;
  mark: string;
  fundType: number;
}

export interface TableBodyProps {
  allRows: number;
  rows: Row<FundRow>[];
  tableRef: RefObject<HTMLDivElement | null>;
  isScrollAtStart: boolean;
  activeIndexCategoryTab: number;
  handlerPinned: (id: number) => void;
  handlerUnPinned: (id: number) => void;
  handlerDeleteWatchList: (id: number) => void;
  handlerMarkFund: (id: number, color: string) => void;
  rowMarks: { id: number; color: string }[];
  handlerAddToWatchList: (fund: number) => void;
  tabs: tabs;
}

export interface TableRowProps<T extends FundRow> {
  row: Row<T>;
  tabs: tabs;
  logo: string;
  handlerDeleteWatchList: (id: number) => void;
  handlerMarkFund: (id: number, color: string) => void;
  isMainTab: boolean;
  handlerPinned: (e: number) => void;
  handlerUnPinned: (e: number) => void;
  activeIndexCategoryTab: number;
  rowMarks: { id: number; color: string }[];
  handleColorChange: (id: string, color: string) => void;
  handlerAddToWatchList: (fund: number) => void;
  isScrollAtStart: boolean;
}

export interface FundsInfoCellProps {
  fundType: number;
  isEtf: boolean;
  name: string;
  logo: string;
  pined: boolean;
  isWatchList: boolean;
  selected: boolean;
  isTradable: boolean;
  isScrolled: boolean;
  className?: string;
  investmentMethod: 'T' | 'I&C';
  pinedFunction: () => void;
  unPinedFunction: () => void;
  addToWatchlist: () => void;
  deleteToWatchlist: () => void;
  canPin: boolean;
  tag: boolean;
  isRowHovered: boolean;
  tabs: tabs;
}
export type ApiColumn = {
  label: string;
  upperTitle: string | null;
  lowerTitle: string | null;
  key: keyof FundTableItemInfoApiModel;
  visible: boolean;
  sort: 'ASC' | 'DESC' | 'NO';
  colorFormat?: 'COLORED' | 'NONE';
  columnGroupId?: number;
  customPeriodStartJdate?: string | null;
  customPeriodEndJdate?: string | null;
};

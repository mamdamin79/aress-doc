import { BadgeProps } from 'design-system';

/**
 * Props for the TradePopup component
 */
export interface TradePopupProps {
  /** Whether the popup is open */
  isOpen: boolean;
  /** Function to close the popup */
  onClose: () => void;
  /** Name of the fund */
  fundName?: string;
  /** Badge properties */
  badge?: BadgeProps;
  /** Estimated buy price */
  estismatedBuyPrice?: number;
  /** Estimated unit */
  estismatedUnit?: number;
  /** Mode of the trade popup */
  mode?: 'buy' | 'sell';
  /** Whether to disable the terms checkbox */
  disableCheck?: boolean;
}

/**
 * Trade mode type
 */
export type TradeMode = 'buy' | 'sell';

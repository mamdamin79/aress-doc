// Buy: kharid saham ya asset jadid
// Sell: foroosh saham ya asset ke dari
// Dividend: sud taqsemi
// Slip Deposit: variz pool ba fishe banki (offline)
// Online Deposit: variz pool ba dargah banki (online)
// Withdraw: bardashte pool be darkhaste karbar
// Adjustment: pardakht ma-be-tafavut
export type ActivityType =
  | 'BUY'
  | 'SELL'
  | 'DIVIDEND'
  | 'SLIP_DEPOSIT'
  | 'ONLINE_DEPOSIT'
  | 'WITHDRAW'
  | 'ADJUSTMENT';

export type TimelineStep = {
  label: string;
  details?: {
    title: string;
    value: string;
  }[];
  status: 'success' | 'error' | 'current' | 'pending';
};

export type ActivityTimelineConfig = {
  type: ActivityType;
  steps: TimelineStep[];
  orderNumber?: number;
  orderDate?: string;
};

// Accordion Content Types
export interface DetailItem {
  label: string;
  value: string | number;
  unit?: string;
}

export interface StepData {
  title: string;
  timestamp?: string;
  details?: DetailItem[];
}

export interface ProgressItem {
  text: string;
  status: 'success' | 'error';
  height?: number;
}

export interface AccordionContentData {
  orderNumber: string;
  estimatedDate?: string;
  infoMessage?: string;
  progressItems: ProgressItem[];
  activeIndex: number;
  steps: StepData[];
}

export interface HeaderItem {
  title: string;
  value: string;
}

export type PaymentMethod = 'فیش بانکی' | 'درگاه بانکی';

export type RequestMethod = 'توسط مشتری' | 'توسط صندوق';

export type TransactionStatus = 'completed' | 'pending' | 'error';

import { ReactNode } from 'react';

export interface BottomSheetProps {
  /**
   * Controls whether the bottom sheet is open
   */
  open: boolean;

  /**
   * Callback function called when the bottom sheet should close
   */
  onDismiss: () => void;

  /**
   * React node rendered as the header of the bottom sheet
   */
  header?: ReactNode;

  /**
   * React node rendered as the body/content of the bottom sheet
   */
  body: ReactNode;

  /**
   * Additional CSS classes to apply to the bottom sheet
   */
  className?: string;

  /**
   * Whether the bottom sheet should block page scrolling when open
   * @default true
   */
  blocking?: boolean;

  /**
   * Whether the bottom sheet should be expandable
   * @default false
   */
  expandOnContentDrag?: boolean;
}

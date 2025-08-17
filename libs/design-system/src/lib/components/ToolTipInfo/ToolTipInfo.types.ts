export interface ToolTipInfoItem {
  text: string;
  id?: string;
}

export interface ToolTipInfoProps {
  /** The trigger element that will show the tooltip on hover */
  children: React.ReactElement;
  /** Title text displayed at the top of the tooltip */
  title?: string;
  /** Description text displayed below the title */
  description?: string;
  /** Array of list items to display */
  items?: ToolTipInfoItem[];
  /** Custom CSS class for the tooltip */
  className?: string;
  /** Offset from the trigger element */
  offset?: number;
  /** How the tooltip should be triggered - 'hover' or 'click' */
  trigger?: 'hover' | 'click';
}

import { IconProps } from "../Icon";

type TooltipProps = {
  children?: React.ReactNode;
  title: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
};

export type DualSwitchItem = {
  tooltip?: TooltipProps;
  icon: IconProps;
};

export interface DualSwitchProps {
  initialIndex?: number;
  onChange?: (value: number) => void;
  items: DualSwitchItem[];
  size?: 'sm' | 'lg';
  disabled?: boolean;
  bgWhite?: boolean;
}
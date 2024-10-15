import { Tooltip } from 'react-tooltip';
import { cn } from '../../../utils';
import 'react-tooltip/dist/react-tooltip.css';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  value: number;
  tooltip?: string;
  size: 'normal' | 'small';
}

export function PercentageLabel({ value, tooltip, size }: Props) {
  // Convert negative number to positive to remove -
  const positiveNumber = Math.abs(value);

  // create unik id for tooltip
  const tooltipId = `tooltip-${uuidv4()}`;

  return (
    <div
      className={cn(
        'rounded-sm w-fit py-1 font-medium font-vazirmatn',
        { 'px-3 text-xs': size === 'normal' },
        { 'px-5 text-sm': size === 'small' },
        { 'bg-green-100 text-green-700': value > 0 },
        { 'bg-red-100 text-red-700': value < 0 },
        tooltipId
      )}
    >
      <Tooltip
        noArrow
        className="tooltip text-xs"
        place="bottom"
        anchorSelect={`.${tooltipId}`}
      >
        {tooltip}
      </Tooltip>
      <div className="flex items-center">
        %<span>{positiveNumber}</span>
        <span className="mr-0.5 mb-0.5">{value > 0 ? '+' : '-'} </span>
      </div>
    </div>
  );
}

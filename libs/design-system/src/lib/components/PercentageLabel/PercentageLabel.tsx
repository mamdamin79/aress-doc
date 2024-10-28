import { cn } from '../../../utils';
import { Tooltip } from '../Tooltip';

interface Props {
  value: number;
  tooltip?: string;
  size: 'normal' | 'small';
}

export const PercentageLabel: React.FC<Props> = ({ value, tooltip, size }) => {
  // Convert negative number to positive to remove -
  const absoluteValue: number = Math.abs(value);

  return (
    <Tooltip
      className="!py-0 !px-2 !rounded-xs !text-xs font-medium"
      position="bottom"
      title={tooltip ?? ''}
    >
      <div
        className={cn(
          'rounded-sm w-fit py-1 font-medium',
          { 'px-5 text-sm': size === 'normal' },
          { 'px-3 text-xs': size === 'small' },
          { 'bg-green-100 text-green-700': value > 0 },
          { 'bg-red-100 text-red-700': value < 0 },
          { 'bg-gray-100 text-gray-1000': value === 0 }
        )}
      >
        <div className="flex items-center">
          <span>{absoluteValue}</span>%
          <span className="mr-0.5 mb-0.5">
            {value > 0 ? '+' : value < 0 && '-'}{' '}
          </span>
        </div>
      </div>
    </Tooltip>
  );
};

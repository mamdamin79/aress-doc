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
      className="!rounded-xs !px-2 !py-0 !text-xs font-medium"
      position="bottom"
      title={tooltip ?? ''}
    >
      <div
        className={cn(
          'flex w-fit items-center justify-center rounded-sm py-1 font-medium',
          { 'w-16 text-sm': size === 'normal' },
          { 'w-14 text-xs': size === 'small' },
          {
            'bg-surface-accent-green-100 text-text-message-success-highcontrast-800':
              value > 0,
          },
          {
            'bg-surface-accent-red-100 text-text-message-error-highcontrast-800':
              value < 0,
          },
          {
            'text-text-neutral-primary bg-surface-neutral-secondary':
              value === 0,
          },
        )}
      >
        <div className="flex items-center">
          <span>{absoluteValue}</span>٪
          <span className="mb-0.5 mr-0.5">
            {value > 0 ? '+' : value < 0 && '-'}{' '}
          </span>
        </div>
      </div>
    </Tooltip>
  );
};

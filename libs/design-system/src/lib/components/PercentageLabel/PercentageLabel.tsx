import { cn } from '../../../utils';

interface Props {
  value: number;
  tooltip?: string;
  size: 'normal' | 'small';
}

export function PercentageLabel({ value, tooltip, size }: Props) {
  // Convert negative number to positive to remove -
  const positiveNumber: number = Math.abs(value);

  if (positiveNumber === 0) return null;

  return (
    <div
      className={cn(
        'rounded-sm w-fit py-1 font-medium font-vazirmatn',
        { 'px-5 text-sm': size === 'normal' },
        { 'px-3 text-xs': size === 'small' },
        { 'bg-green-100 text-green-700': value > 0 },
        { 'bg-red-100 text-red-700': value < 0 }
      )}
    >
      <div className="flex items-center">
        <span>{positiveNumber}</span>%
        <span className="mr-0.5 mb-0.5">{value > 0 ? '+' : '-'} </span>
      </div>
    </div>
  );
}

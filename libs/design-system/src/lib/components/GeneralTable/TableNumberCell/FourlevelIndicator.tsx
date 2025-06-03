import { cn } from 'libs/design-system/src/utils/classNames.utils';

interface FourlevelIndicatorProps {
  value: number;
  max?: number;
  grayMode: boolean;
}

export const FourlevelIndicator = ({
  value,
  max = 4,
  grayMode = false,
}: FourlevelIndicatorProps) => {
  const indicatorLevels = Array(max).fill(null);
  return (
    <div className="border-border-accent-gray-900 rounded-xs mx-auto flex h-8 w-6 flex-col-reverse overflow-hidden border transition-all">
      {indicatorLevels.map((_, valueIndex: number) => {
        const currentLevel = valueIndex + 1 || 0;
        return (
          <div
            key={`level-${valueIndex}`}
            className={cn(
              'border-border-accent-gray-700 h-2 w-full',
              currentLevel !== max && 'border-t',
              currentLevel < value
                ? grayMode
                  ? 'bg-border-neutral-secondary'
                  : 'bg-border-accent-blue-200'
                : currentLevel > value
                  ? 'bg-icon-neutral-white'
                  : grayMode
                    ? 'bg-surface-accent-gray-500'
                    : 'bg-surface-accent-blue-700',
            )}
          ></div>
        );
      })}
    </div>
  );
};

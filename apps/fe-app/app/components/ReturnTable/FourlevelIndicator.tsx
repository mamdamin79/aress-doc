interface FourlevelIndicatorProps {
  level: number;
  max: number;
}
import { cn } from 'design-system';

export const FourlevelIndicatorProps = ({
  level,
  max,
}: FourlevelIndicatorProps) => {
  const tempArr = Array(max).fill(null);
  return (
    <div className="mx-auto w-6 h-8 border border-gray-900 rounded-xs overflow-hidden flex flex-col-reverse">
      {tempArr.map((_, valueIndex: number) => {
        const currentLevel = valueIndex + 1 || 0;
        return (
          <div
            key={valueIndex}
            className={cn(
              'w-full h-2 border-gray-700',
              currentLevel !== max && 'border-t-[0.5px]',
              currentLevel < level
                ? 'bg-blue-200'
                : currentLevel > level
                ? 'bg-white'
                : 'bg-blue-700'
            )}
          ></div>
        );
      })}
    </div>
  );
};

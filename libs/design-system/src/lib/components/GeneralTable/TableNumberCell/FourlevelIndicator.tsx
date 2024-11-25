import { cn } from "libs/design-system/src/utils/classNames.utils";

interface FourlevelIndicatorProps {
  value: number;
  max?: number;
  grayMode:boolean
}

export const FourlevelIndicatorProps = ({
  value,
  max = 4,
  grayMode=false
}: FourlevelIndicatorProps) => {
  const tempArr = Array(max).fill(null);
  return (
    <div className="mx-auto w-6 h-8 border border-gray-900 rounded-xs overflow-hidden flex flex-col-reverse transition-all">
      {tempArr.map((_, valueIndex: number) => {
        const currentLevel = valueIndex + 1 || 0;
        return (
          <div
            key={valueIndex}
            className={cn(
              'w-full h-2 border-gray-700',
              currentLevel !== max && 'border-t-[0.5px]',
              currentLevel < value
                ? grayMode ? 'bg-gray-200' : 'bg-blue-200'
                : currentLevel > value
                ? 'bg-white'
                :                  grayMode ? 'bg-gray-500':'bg-blue-700',

            )}
          ></div>
        );
      })}
    </div>
  );
};

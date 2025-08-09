import { cn } from '../../../utils';
import { ProgressCircle } from './ProgressCircle';

interface Props {
  progressBarItems: string[];
  activeIndex: number;
}

export function ProgressBar({ progressBarItems, activeIndex }: Props) {
  return (
    <div className="relative flex items-center justify-between">
      <div className="flex w-full items-start justify-center">
        {progressBarItems.map((item, index) => (
          <div className="grid w-96 grid-cols-12" key={index}>
            {/* Connecting Line */}
            {index + 1 < progressBarItems.length && (
              <div className="relative col-span-12 -mt-2 flex items-center justify-center">
                <div className="bg-border-neutral-primary absolute mr-[100%] h-1 w-full" />
                <div
                  className={cn(
                    'bg-surface-brand-500 absolute mr-[100%] h-1 transition-all duration-300',
                    activeIndex > index ? 'w-full' : 'w-0',
                  )}
                />
              </div>
            )}

            {/* Circle and Text */}
            <div className="relative col-span-12 col-start-1 flex w-full flex-col items-center justify-center">
              {activeIndex === index ? (
                <ProgressCircle mode="active" />
              ) : activeIndex > index ? (
                <ProgressCircle mode="inactive" />
              ) : (
                <ProgressCircle mode="passed" />
              )}
              <div
                className={cn(
                  'text-md text-text-neutral-primary mt-3 w-full text-center font-medium',
                  activeIndex < index && 'text-text-neutral-secondary text-sm',
                )}
              >
                {item}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

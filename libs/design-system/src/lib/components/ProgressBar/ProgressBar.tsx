import { cn } from '../../../utils';
import { ProgressCircle } from './ProgressCircle';

interface Props {
  progressBarItems: string[];
  activeIndex: number;
}

export function ProgressBar({ progressBarItems, activeIndex }: Props) {
  return (
    <div className="relative flex items-center justify-between py-10">
      <div className="flex w-full items-start justify-center">
        {progressBarItems.map((item, index) => (
          <div className="grid w-96 grid-cols-12" key={index}>
            {index + 1 < progressBarItems.length && (
              <div className="relative -z-50 col-span-12 -ml-1 -mt-2 mr-[51%] h-2 w-full overflow-hidden">
                <div className="absolute -ml-1 h-full w-full bg-gray-200"></div>
                <div
                  className={cn(
                    'absolute h-full w-full',
                    activeIndex > index && 'bg-brand-600 animate-progressBar',
                  )}
                ></div>
              </div>
            )}
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
                  'text-md col-span-12 mr-6 mt-5 w-full break-keep text-center font-medium',
                  activeIndex < index && 'text-sm text-gray-600',
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

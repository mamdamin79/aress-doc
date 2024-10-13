import { cn } from '../../../utils';
import { ProgressCircle } from './ProgressCircle';

interface Props {
  progressBarItems: string[];
  activeIndex: number;
}

export function ProgressBar({ progressBarItems, activeIndex }: Props) {
  return (
    <div className="flex px-10 py-10 justify-between items-center">
      <div className="w-full flex items-center">
        {progressBarItems.map((item, index) => (
          <>
            <div className="relative flex flex-col items-center justify-center">
              {activeIndex === index ? (
                <ProgressCircle mode="active" />
              ) : activeIndex > index ? (
                <ProgressCircle mode="inactive" />
              ) : (
                <ProgressCircle mode="passed" />
              )}
              <div
                className={cn(
                  'absolute w-max mr-6 font-vazirmatn font-medium text-md top-0 text-center mt-5 break-all',
                  activeIndex < index && 'text-gray-600 text-sm'
                )}
              >
                {item}
              </div>
            </div>
            {index + 1 < progressBarItems.length && (
              <div className="w-full -z-50 overflow-hidden relative h-2">
                <div className="w-full h-full bg-gray-200 absolute"></div>
                <div
                  className={cn(
                    'w-full h-full absolute',
                    activeIndex > index && 'bg-brand-600 animate-progressBar'
                  )}
                ></div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

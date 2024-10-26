import { cn } from '../../../utils';
import { ProgressCircle } from './ProgressCircle';

interface Props {
  progressBarItems: string[];
  activeIndex: number;
}

export function ProgressBar({ progressBarItems, activeIndex }: Props) {
  return (
    <div className="flex relative py-10 justify-between items-center">
      <div className="w-full flex justify-center items-start">
        {progressBarItems.map((item, index) => (
          <div className="grid grid-cols-12 w-96" key={index}>
            {index + 1 < progressBarItems.length && (
              <div className="w-full col-span-12 mr-[51%] -mt-2 -z-50 overflow-hidden relative -ml-1 h-2">
                <div className="w-full -ml-1 h-full bg-gray-200 absolute"></div>
                <div
                  className={cn(
                    'w-full h-full absolute',
                    activeIndex > index && 'bg-brand-600 animate-progressBar'
                  )}
                ></div>
              </div>
            )}
            <div className="relative w-full col-start-1 col-span-12 flex flex-col items-center justify-center">
              {activeIndex === index ? (
                <ProgressCircle mode="active" />
              ) : activeIndex > index ? (
                <ProgressCircle mode="inactive" />
              ) : (
                <ProgressCircle mode="passed" />
              )}
              <div
                className={cn(
                  'mr-6 w-full col-span-12 break-keep font-medium text-md text-center mt-5',
                  activeIndex < index && 'text-gray-600 text-sm'
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

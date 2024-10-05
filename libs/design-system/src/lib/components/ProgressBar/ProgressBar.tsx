import { cn } from '../../../utils';
import { ProgressCircle } from './ProgressCircle';

interface Props {
  progressBarItems: string[];
  activeIndex: number;
}

export function ProgressBar({ progressBarItems, activeIndex }: Props) {
  return (
    <div className="relative flex mx-auto items-start justify-between">
      {activeIndex < progressBarItems.length &&
        activeIndex >= 0 &&
        progressBarItems.map((item: string, index: number) => (
          <div
            className={cn(
              index === progressBarItems.length - 1 ? 'w-full' : 'w-full',
              'relative flex flex-col justify-center items-center'
            )}
            key={index}
          >
            {activeIndex === index ? (
              <ProgressCircle mode="active" />
            ) : activeIndex > index ? (
              <ProgressCircle mode="inactive" />
            ) : (
              <ProgressCircle mode="passed" />
            )}
            {index + 1 < progressBarItems.length && (
              <div className="w-full -z-50 overflow-hidden relative h-2 mr-[100%]">
                <div className="w-full h-full bg-gray-200 absolute"></div>
                <div
                  className={cn(
                    'w-full h-full absolute',
                    activeIndex > index && 'bg-brand-600 animate-progressBar'
                  )}
                ></div>
              </div>
            )}
            <span
              className={cn(
                'text-md mt-4 mr-4',
                activeIndex < index && 'text-gray-600 text-sm'
              )}
            >
              {item}
            </span>
          </div>
        ))}
    </div>
  );
}

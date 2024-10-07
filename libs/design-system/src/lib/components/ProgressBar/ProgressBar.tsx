import { cn } from '../../../utils';
import { ProgressCircle } from './ProgressCircle';

interface Props {
  progressBarItems: string[];
  activeIndex: number;
}

export function ProgressBar({ progressBarItems, activeIndex }: Props) {
  return (
    <div className="flex px-20 py-10 justify-between items-center">
      <div className="w-full  flex items-center">
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
                  'absolute w-40 mr-4 font-vazirmatn font-medium text-md top-0 text-center mt-5 break-all',
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

        {/* {progressBarItems.map((item: string, index: number) => (
          <div
            className="flex flex-col items-center relative"
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
              <div className="w-full -z-50 overflow-hidden relative h-2">
                <div className="w-full h-full bg-gray-200 absolute"></div>
                <div
                  className={cn(
                    'w-full h-full',
                    activeIndex > index && 'bg-brand-600 animate-progressBar'
                  )}
                ></div>
              </div>
            )}
            <span
              className={cn(
                'text-md absolute top-0 mt-16 text-center mr-4',
                activeIndex < index && 'text-gray-600 text-sm'
              )}
            >
              {item}
            <div className='border-t-2 flex-auto bg-red-600 w-[100%] absolute'>
            </div>
            </span>
          </div>
        ))} */}
      </div>
    </div>
  );
}

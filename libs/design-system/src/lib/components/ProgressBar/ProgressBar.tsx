import { cn } from './../../../utils';
import { Icon } from '../Icon';
import { ProgressCircle } from './ProgressCircle';

interface ProgressBarItemType {
  text: string;
  status: 'error' | 'success';
}

interface Props {
  progressBarItems: ProgressBarItemType[];
  activeIndex: number;
  orientation?: 'vertical' | 'horizental';
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
                <div className="bg-border-neutral-primary absolute mr-[90%] h-1 w-full" />
                <div
                  className={cn(
                    'absolute mr-[90%] h-1 transition-all duration-300',
                    activeIndex > index ? 'w-full' : 'w-0',
                    item.status === 'success'
                      ? 'bg-surface-brand-500'
                      : 'bg-surface-message-error-300-disable',
                  )}
                />
              </div>
            )}

            {/* Circle and Text */}
            <div className="relative col-span-12 col-start-1 flex w-full flex-col items-center justify-center">
              {activeIndex === index ? (
                activeIndex &&
                progressBarItems.length > activeIndex &&
                progressBarItems[activeIndex - 1].status === 'error' ? (
                  <ProgressCircle mode="passed" />
                ) : (
                  <ProgressCircle mode="active" />
                )
              ) : activeIndex > index ? (
                <ProgressCircle status={item.status} mode="inactive">
                  <Icon name={item.status === 'error' ? 'x' : 'check'} />
                </ProgressCircle>
              ) : (
                <ProgressCircle mode="passed" />
              )}
              <div
                className={cn(
                  'text-md text-text-neutral-primary mt-3 w-full text-center font-medium',
                  activeIndex < index && 'text-text-neutral-secondary text-sm',
                )}
              >
                {item.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

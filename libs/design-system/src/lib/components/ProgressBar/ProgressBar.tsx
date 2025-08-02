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

export function ProgressBar({
  progressBarItems,
  activeIndex,
  orientation,
}: Props) {
  return (
    <div className="relative flex items-center justify-between">
      <div
        className={cn('flex w-full items-start justify-center', {
          'flex-col': orientation === 'vertical',
          'flex-row': orientation === 'horizental',
        })}
      >
        {progressBarItems.map((item, index) => (
          <div
            className={cn('grid', {
              'w-96 grid-cols-12': orientation === 'horizental',
              'h-[120px] grid-rows-12': orientation === 'vertical',
            })}
            key={index}
          >
            {/* Connecting Line */}
            {orientation === 'horizental' &&
              index + 1 < progressBarItems.length && (
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

            {orientation === 'vertical' && (
              <div className="relative row-span-12 flex flex-col items-center justify-center">
                {index + 1 < progressBarItems.length && (
                  <div className="bg-border-neutral-primary absolute top-[120px] h-[120px] w-1" />
                )}
                {index + 1 < progressBarItems.length && (
                  <div
                    className={cn(
                      'absolute top-[120px] transition-all duration-300',
                      activeIndex > index ? 'h-full w-1' : 'h-0 w-0',
                      item.status === 'success'
                        ? 'bg-surface-brand-500'
                        : 'bg-surface-message-error-300-disable',
                    )}
                  />
                )}
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
                  <Icon
                    size="sm"
                    name={item.status === 'error' ? 'x' : 'check'}
                  />
                </ProgressCircle>
              ) : (
                <ProgressCircle mode="passed" />
              )}
              {orientation === 'horizental' && (
                <div
                  className={cn(
                    'text-md text-text-neutral-primary mt-3 w-full text-center font-medium',
                    activeIndex < index &&
                      'text-text-neutral-secondary text-sm',
                  )}
                >
                  {item.text}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

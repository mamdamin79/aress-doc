import { cn } from './../../../utils';
import { Icon } from '../Icon';
import { ProgressCircle } from './ProgressCircle';
import { ProgressBarItemType } from './ProgressBar.types';

interface ProgressBarProps {
  progressBarItems: ProgressBarItemType[];
  activeIndex: number;
  orientation?: 'vertical' | 'horizontal';
}

export function ProgressBar({
  progressBarItems,
  activeIndex,
  orientation = 'horizontal',
}: ProgressBarProps) {
  return (
    <div className="relative flex items-center justify-between">
      <div
        className={cn('flex w-full', {
          'flex-col items-center': orientation === 'vertical',
          'flex-row items-start justify-center': orientation === 'horizontal',
        })}
      >
        {progressBarItems.map((item, index) => {
          // Convert height to string with px if it's a number
          const sectionHeight = item.height
            ? typeof item.height === 'number'
              ? `${item.height}px`
              : item.height
            : '120px'; // Default height

          return (
            <div
              className={cn('relative', {
                'grid w-96 grid-cols-12': orientation === 'horizontal',
                'flex flex-col items-center': orientation === 'vertical',
              })}
              style={
                orientation === 'vertical'
                  ? { minHeight: sectionHeight }
                  : undefined
              }
              key={index}
            >
              {/* Connecting Line */}
              {orientation === 'horizontal' &&
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

              {/* Circle and Text */}
              <div
                className={cn('relative z-10 flex flex-col items-center', {
                  'col-span-12 col-start-1 w-full justify-center':
                    orientation === 'horizontal',
                  'justify-start': orientation === 'vertical',
                })}
              >
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
                {orientation === 'horizontal' && (
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

                {/* Vertical connecting line - positioned after the circle */}
                {orientation === 'vertical' &&
                  (index + 1 < progressBarItems.length ||
                    progressBarItems.length === 1) && (
                    <div className="relative -z-20 flex flex-col items-center">
                      {/* Background line */}
                      <div
                        className="bg-border-neutral-primary w-1 rounded-b-xl"
                        style={{
                          height: sectionHeight,
                        }}
                      />
                      {/* Progress line */}
                      <div
                        className={cn(
                          'absolute top-0 -z-0 rounded-b-xl transition-all duration-300',
                          activeIndex > index ? 'w-1' : 'h-0 w-0',
                          item.status === 'success'
                            ? 'bg-surface-brand-500'
                            : 'bg-surface-message-error-300-disable',
                        )}
                        style={
                          activeIndex > index
                            ? {
                                height: sectionHeight,
                              }
                            : {}
                        }
                      />
                    </div>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { Transition } from '@headlessui/react';
import { LoadingSpinner, SuccessOrFail } from './LoadedStatuses';

interface LoadingBarPopProps {
  status: 'loading' | 'done' | 'rejected';
  duration?: number;
}
export const LoadingBarPop: React.FC<LoadingBarPopProps> = ({
  status = 'loading',
  duration = 4,
}) => {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <Transition
        show={status === 'loading'}
        enter="transition-transform transition-opacity duration-300"
        enterFrom="scale-0 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition-transform transition-opacity duration-200"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-0 opacity-0"
      >
        <div className="absolute">
          <LoadingSpinner duration={duration} />
        </div>
      </Transition>

      <Transition
        show={status === 'done' || status === 'rejected'}
        enter="transition-transform transition-opacity duration-300"
        enterFrom="scale-0 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition-transform transition-opacity duration-200"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-0 opacity-0"
      >
        <div
          className="absolute"
          aria-hidden={!(status === 'done' || status === 'rejected')}
        >
          <SuccessOrFail status={status as 'done' | 'rejected'} />
        </div>
      </Transition>
    </div>
  );
};

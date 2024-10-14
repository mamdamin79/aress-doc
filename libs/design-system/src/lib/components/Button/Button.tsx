import { cn } from '../../../utils';
import { Icon } from '../Icon';
import { IconName } from '../Icon/Icon.types';
import { ButtonMode, ButtonSize } from './Button.types';

interface Props {
  iconRight?: IconName;
  iconLeft?: IconName;
  text: string;
  disable: boolean;
  loading: boolean;
  size: ButtonSize;
  mode: ButtonMode;
  align: 'center' | 'right';
}

const alignButton = {
  center: 'justify-center',
  right: 'justify-start',
};

const baseClasses =
  'flex gap-2 group w-full transition-all duration-300 items-center px-2';

export function ButtonComponent({
  iconRight,
  iconLeft,
  text,
  mode,
  size,
  disable,
  align,
  loading,
}: Props) {
  return (
    <button
      className={cn(
        baseClasses,
        alignButton[align],
        { 'cursor-default': disable },
        { 'rounded-lg h-12': size === 'md' },
        { 'rounded-md h-[38px]': size === 'sm' },
        { 'bg-brand-300 text-white': mode === 'primary' && disable },
        {
          'bg-brand-600 text-white': mode === 'primary' && loading && !disable,
        },
        {
          'bg-brand-600 active:bg-brand-800 text-white hover:bg-brand-700':
            mode === 'primary' && !loading && !disable,
        },
        {
          'border-brand-300 border text-brand-300':
            mode === 'secondary' && disable,
        },
        {
          'border border-brand-600 text-brand-600':
            mode === 'secondary' && loading && !disable,
        },
        {
          'bg-white active:bg-brand-800 border border-brand-600 text-brand-600 hover:bg-brand-700 hover:text-white':
            mode === 'secondary' && !loading && !disable,
        },
        { 'text-brand-300': mode === 'text' && disable },
        {
          'text-brand-600 border border-brand-600':
            mode === 'text' && loading && !disable,
        },
        {
          'text-brand-600 active:text-brand-800 active:border-brand-800 hover:border hover:border-brand-600':
            mode === 'text' && !loading && !disable,
        },
        { 'text-brand-300': mode === 'underline' && disable },
        { 'text-brand-600': mode === 'underline' && loading && !disable },
        { 'text-brand-600': mode === 'underline' && !loading && !disable }
      )}
    >
      {loading ? (
        <div className="min-w-[130px]">
          <div className="animate-spin w-fit mx-auto">
            <Icon name="loader-circle" />
          </div>
        </div>
      ) : (
        <>
          {iconRight && <Icon size="lg" name={iconRight} />}
          <span
            className={cn(
              'font-vazirmatn',
              `text-${align}`,
              mode === 'underline' &&
                !disable &&
                'transition-all pb-1  font-vazirmatn group-hover:underline underline-offset-8 group-hover:border-b-brand-600'
            )}
          >
            {text}
          </span>

          {iconLeft && <Icon size="lg" name={iconLeft} />}
        </>
      )}
    </button>
  );
}

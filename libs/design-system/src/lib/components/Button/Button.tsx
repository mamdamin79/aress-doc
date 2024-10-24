import { cn } from '../../../utils';
import { Icon, IconProps } from '../Icon';
import { ButtonMode, ButtonSize } from './Button.types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  iconLeft?: IconProps;
  iconRight?: IconProps;
  size: ButtonSize;
  mode: ButtonMode;
  align: 'center' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  mode,
  size,
  disabled,
  align,
  iconRight,
  isLoading,
  iconLeft,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        'flex gap-2 group w-full transition-all duration-300 items-center px-2',
        { 'justify-center': align === 'center' },
        { 'justify-start': align === 'right' },
        { 'cursor-default': disabled },
        { 'rounded-lg h-12': size === 'md' },
        { 'rounded-md h-[38px]': size === 'sm' },
        { 'bg-brand-300 text-white': mode === 'primary' && disabled },
        {
          'bg-brand-600 text-white':
            mode === 'primary' && isLoading && !disabled,
        },
        {
          'bg-brand-600 active:bg-brand-800 text-white hover:bg-brand-700':
            mode === 'primary' && !isLoading && !disabled,
        },
        {
          'border-brand-300 border text-brand-300':
            mode === 'secondary' && disabled,
        },
        {
          'border border-brand-600 text-brand-600':
            mode === 'secondary' && isLoading && !disabled,
        },
        {
          'bg-white active:bg-brand-800 border border-brand-600 text-brand-600 hover:bg-brand-700 hover:text-white':
            mode === 'secondary' && !isLoading && !disabled,
        },
        { 'text-brand-300': mode === 'text' && disabled },
        {
          'text-brand-600 border border-brand-600':
            mode === 'text' && isLoading && !disabled,
        },
        {
          'text-brand-600 active:text-brand-800 active:border-brand-800 hover:border hover:border-brand-600':
            mode === 'text' && !isLoading && !disabled,
        },
        { 'text-brand-300': mode === 'underline' && disabled },
        { 'text-brand-600': mode === 'underline' && isLoading && !disabled },
        {
          'text-brand-600 active:text-brand-800 active:border-brand-800':
            mode === 'underline' && !isLoading && !disabled,
        }
      )}
    >
      {isLoading ? (
        <div>
          <div className="animate-spin w-fit mx-auto">
            <Icon name="loader-circle" />
          </div>
        </div>
      ) : (
        <>
          {iconRight && <Icon {...iconRight} />}
          <span
            className={cn(
              { 'text-right': align === 'right' },
              { 'text-center': align === 'center' },
              mode === 'underline' &&
                !disabled &&
                'transition-transform pb-1 group-hover:underline underline-offset-8 group-hover:border-b-brand-600'
            )}
          >
            {children}
          </span>
          {iconLeft && <Icon {...iconLeft} />}
        </>
      )}
    </button>
  );
};

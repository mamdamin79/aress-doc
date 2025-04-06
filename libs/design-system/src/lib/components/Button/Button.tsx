import { cn } from '../../../utils';
import { Icon, IconProps } from '../Icon';
import { ButtonMode, ButtonSize } from './Button.types';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  iconLeft?: IconProps;
  iconRight?: IconProps;
  size: ButtonSize;
  mode: ButtonMode;
  align: 'center' | 'right';
  theme: 'brand' | 'error';
}

export const Button: React.FC<ButtonProps> = ({
  mode,
  theme = 'brand',
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
        'group flex w-full items-center gap-2 px-2 py-2 transition-all duration-300',
        { 'justify-center': align === 'center' },
        { 'justify-start': align === 'right' },
        { 'cursor-default': disabled },
        { 'h-12 rounded-lg': size === 'md' },
        { 'h-[38px] rounded-md': size === 'sm' },
        { 'bg-brand-300 text-white': mode === 'primary' && disabled },
        {
          'bg-brand-600 text-white':
            mode === 'primary' && isLoading && !disabled,
        },
        {
          'bg-brand-600 active:bg-brand-800 hover:bg-brand-700 text-white':
            mode === 'primary' && !isLoading && !disabled,
        },
        {
          'border-brand-300 text-brand-300 border':
            mode === 'secondary' && disabled,
        },
        {
          'border-brand-600 text-brand-600 border':
            mode === 'secondary' && isLoading && !disabled,
        },
        {
          'active:bg-brand-800 border-brand-600 text-brand-600 hover:bg-brand-700 border bg-white hover:text-white':
            mode === 'secondary' && !isLoading && !disabled,
        },
        { 'text-brand-300': mode === 'text' && disabled },
        {
          'text-brand-600 border-brand-600 border':
            mode === 'text' && isLoading && !disabled,
        },
        {
          'text-brand-600 active:text-brand-800 active:border-brand-800 hover:border-brand-600 hover:border':
            mode === 'text' && !isLoading && !disabled,
        },
        { 'text-brand-300': mode === 'underline' && disabled },
        { 'text-brand-600': mode === 'underline' && isLoading && !disabled },
        {
          'text-brand-600 active:text-brand-800 active:border-brand-800':
            mode === 'underline' && !isLoading && !disabled,
        },
      )}
    >
      {isLoading ? (
        <div>
          <div className="mx-auto w-fit animate-spin">
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
                'group-hover:border-b-brand-600 pb-1 underline-offset-8 transition-transform group-hover:underline',
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

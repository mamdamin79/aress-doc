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
  theme?: 'brand' | 'error' | 'success' | 'neutral';
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
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        'group flex w-full items-center gap-2 px-2 transition-all duration-300',
        { 'cursor-default': isLoading || disabled },
        { 'justify-center': align === 'center' },
        { 'justify-start': align === 'right' },
        { 'h-12 rounded-lg': size === 'md' },
        { 'h-[38px] rounded-md': size === 'sm' },
        mode === 'primary' && 'text-white',

        // PRIMARY MODE
        mode === 'primary' &&
          disabled &&
          (theme === 'brand'
            ? 'bg-brand-300'
            : theme === 'error'
              ? 'bg-red-300'
              : theme === 'success'
                ? 'bg-green-300'
                : 'bg-gray-300'),
        mode === 'primary' &&
          isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'bg-brand-600'
            : theme === 'error'
              ? 'bg-red-600'
              : theme === 'success'
                ? 'bg-green-600'
                : 'bg-gray-600'),
        mode === 'primary' &&
          !isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'bg-brand-600 hover:bg-brand-700 active:bg-brand-800'
            : theme === 'error'
              ? 'bg-red-600 hover:bg-red-700 active:bg-red-800'
              : theme === 'success'
                ? 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                : 'bg-gray-600 hover:bg-gray-700 active:bg-gray-800'),

        // SECONDARY MODE
        mode === 'secondary' &&
          disabled &&
          (theme === 'brand'
            ? 'border-brand-300 text-brand-300 border'
            : theme === 'error'
              ? 'border border-red-300 text-red-300'
              : theme === 'success'
                ? 'border border-green-300 text-green-300'
                : 'border border-gray-300 text-gray-300'),
        mode === 'secondary' &&
          isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'border-brand-600 text-brand-600 border'
            : theme === 'error'
              ? 'border border-red-600 text-red-600'
              : theme === 'success'
                ? 'border border-green-600 text-green-600'
                : 'text-gray-1000 border border-gray-600'),
        mode === 'secondary' &&
          !isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'border-brand-600 text-brand-600 hover:bg-brand-700 hover:border-brand-700 active:bg-brand-800 border bg-white hover:text-white active:border-red-800'
            : theme === 'error'
              ? 'border border-red-600 bg-white text-red-600 hover:border-red-700 hover:bg-red-700 hover:text-white active:border-red-800 active:bg-red-800'
              : theme === 'success'
                ? 'border border-green-600 bg-white text-green-600 hover:border-green-700 hover:bg-green-700 hover:text-white active:border-green-800 active:bg-green-800'
                : 'text-gray-1000 border border-gray-600 bg-white hover:border-gray-700 hover:bg-gray-700 hover:text-white active:border-gray-800 active:bg-gray-800'),

        // TEXT MODE
        mode === 'text' &&
          disabled &&
          (theme === 'brand'
            ? 'text-brand-300'
            : theme === 'error'
              ? 'text-red-300'
              : theme === 'success'
                ? 'text-green-300'
                : 'text-gray-300'),
        mode === 'text' &&
          isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'border-brand-600 text-brand-600 border'
            : theme === 'error'
              ? 'border border-red-600 text-red-600'
              : theme === 'success'
                ? 'border border-green-600 text-green-600'
                : 'text-gray-1000 border border-gray-600'),
        mode === 'text' &&
          !isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'text-brand-600 hover:border-brand-600 active:border-brand-800 active:text-brand-800 hover:border'
            : theme === 'error'
              ? 'text-red-600 hover:border hover:border-red-600 active:border-red-800 active:text-red-800'
              : theme === 'success'
                ? 'text-green-600 hover:border hover:border-green-600 active:border-green-800 active:text-green-800'
                : 'text-gray-1000 hover:border hover:border-gray-600 active:border-gray-800 active:text-gray-800'),

        // UNDERLINE MODE
        mode === 'underline' &&
          disabled &&
          (theme === 'brand'
            ? 'text-brand-300'
            : theme === 'error'
              ? 'text-red-300'
              : theme === 'success'
                ? 'text-green-300'
                : 'text-gray-300'),
        mode === 'underline' &&
          isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'text-brand-600'
            : theme === 'error'
              ? 'text-red-600'
              : theme === 'success'
                ? 'text-green-600'
                : 'text-gray-1000'),
        mode === 'underline' &&
          !isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'text-brand-600 active:text-brand-800 active:border-brand-800'
            : theme === 'error'
              ? 'text-red-600 active:border-red-800 active:text-red-800'
              : theme === 'success'
                ? 'text-green-600 active:border-green-800 active:text-green-800'
                : 'text-gray-1000 active:border-gray-800 active:text-gray-800'),
        className,
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
                'pb-1 underline-offset-8 transition-transform group-hover:border-b group-hover:underline',
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

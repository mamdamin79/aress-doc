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
  theme?: 'brand' | 'error';
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
        'group flex w-full items-center gap-2 px-2 transition-all duration-300',
        { 'cursor-default': isLoading || disabled },
        { 'justify-center': align === 'center' },
        { 'justify-start': align === 'right' },
        { 'cursor-default': disabled },
        { 'h-12 rounded-lg': size === 'md' },
        { 'h-[38px] rounded-md': size === 'sm' },
        mode === 'primary' && 'text-white',
        mode === 'primary' &&
          disabled &&
          (theme === 'brand' ? 'bg-brand-300' : 'bg-red-300'),
        mode === 'primary' &&
          isLoading &&
          !disabled &&
          (theme === 'brand' ? 'bg-brand-600' : 'bg-red-600'),
        mode === 'primary' &&
          !isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'bg-brand-600 active:bg-brand-800 hover:bg-brand-700'
            : 'bg-red-600 hover:bg-red-700 active:bg-red-800'),
        mode === 'secondary' &&
          disabled &&
          (theme === 'brand'
            ? 'border-brand-300 text-brand-300 border'
            : 'border border-red-300 text-red-300'),
        mode === 'secondary' &&
          isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'border-brand-600 text-brand-600 border'
            : 'border border-red-600 text-red-600'),
        mode === 'secondary' &&
          !isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'active:bg-brand-800 border-brand-600 text-brand-600 hover:bg-brand-700 border bg-white hover:text-white'
            : 'border border-red-600 bg-white text-red-600 hover:bg-red-700 hover:text-white active:bg-red-800'),
        mode === 'text' &&
          disabled &&
          (theme === 'brand' ? 'text-brand-300' : 'text-red-300'),
        mode === 'text' &&
          isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'text-brand-600 border-brand-600 border'
            : 'border border-red-600 text-red-600'),
        mode === 'text' &&
          !isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'text-brand-600 active:text-brand-800 active:border-brand-800 hover:border-brand-600 hover:border'
            : 'text-red-600 hover:border hover:border-red-600 active:border-red-800 active:text-red-800'),
        mode === 'underline' &&
          disabled &&
          (theme === 'brand' ? 'text-brand-300' : 'text-red-300'),
        mode === 'underline' &&
          !disabled &&
          isLoading &&
          (theme === 'brand' ? 'text-brand-600' : 'text-red-600'),
        mode === 'underline' &&
          !isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'text-brand-600 active:text-brand-800 active:border-brand-800'
            : 'active:red-brand-800 text-red-600 active:border-red-800'),
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

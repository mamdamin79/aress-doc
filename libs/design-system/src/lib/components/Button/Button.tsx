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
  theme: 'brand' | 'pressed';
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
        'flex gap-2 group w-full transition-all duration-300 items-center px-2',
        { 'cursor-default': isLoading || disabled },
        { 'justify-center': align === 'center' },
        { 'justify-start': align === 'right' },
        { 'cursor-default': disabled },
        { 'rounded-lg h-12': size === 'md' },
        { 'rounded-md h-[38px]': size === 'sm' },
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
            : 'bg-red-600 active:bg-red-800 hover:bg-red-700'),
        mode === 'secondary' &&
          disabled &&
          (theme === 'brand'
            ? 'border-brand-300 border text-brand-300'
            : 'border-red-300 border text-red-300'),
        mode === 'secondary' &&
          isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'border border-brand-600 text-brand-600'
            : 'border border-red-600 text-red-600'),
        mode === 'secondary' &&
          !isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'bg-white active:bg-brand-800 border border-brand-600 text-brand-600 hover:bg-brand-700 hover:text-white'
            : 'bg-white active:bg-red-800 border text-red-600 border-red-600 hover:bg-red-700 hover:text-white'),
        mode === 'text' &&
          disabled &&
          (theme === 'brand' ? 'text-brand-300' : 'text-red-300'),
        mode === 'text' &&
          isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'text-brand-600 border border-brand-600'
            : 'text-red-600 border border-red-600'),
        mode === 'text' &&
          !isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'text-brand-600 active:text-brand-800 active:border-brand-800 hover:border hover:border-brand-600'
            : 'text-red-600 active:text-red-800 active:border-red-800 hover:border hover:border-red-600'),
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
            : 'text-red-600 active:red-brand-800 active:border-red-800'),
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
                'transition-transform pb-1 group-hover:underline underline-offset-8 group-hover:border-b-brand-600',
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

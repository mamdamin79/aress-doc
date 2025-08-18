import { cn } from '../../../utils';
import { Icon, IconProps } from '../Icon';
import { ButtonMode, ButtonSize } from './Button.types';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  iconLeft?: IconProps;
  iconRight?: IconProps;
  size?: ButtonSize;
  mode: ButtonMode;
  align?: 'center' | 'right';
  theme: 'brand' | 'error' | 'success' | 'neutral';
}

export const Button: React.FC<ButtonProps> = ({
  mode = 'primary',
  theme = 'brand',
  size = 'md',
  disabled,
  align = 'center',
  iconRight,
  isLoading = false,
  iconLeft,
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        'bg-test-color-b2c group flex w-full items-center gap-2 px-2 transition-all',
        { 'cursor-default': isLoading || disabled },
        { 'justify-center': align === 'center' },
        { 'justify-start': align === 'right' },
        { 'h-12 rounded-lg': size === 'md' },
        { 'h-[38px] rounded-md': size === 'sm' },
        mode === 'primary' && 'text-button-brand-label-onsurface',

        // PRIMARY MODE
        mode === 'primary' &&
          disabled &&
          (theme === 'brand'
            ? 'bg-button-brand-surface-disable'
            : theme === 'error'
              ? 'bg-button-error-surface-disable'
              : theme === 'success'
                ? 'bg-button-success-surface-disable'
                : 'bg-button-neutral-surface-disable'),
        mode === 'primary' &&
          isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'bg-button-brand-surface-loading'
            : theme === 'error'
              ? 'bg-button-error-surface-loading'
              : theme === 'success'
                ? 'bg-button-green-surface-loading'
                : 'bbg-button-dray-surface-loading'),
        mode === 'primary' &&
          !isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'bg-button-brand-surface-default hover:bg-button-brand-surface-hover active:bg-button-brand-surface-pressed'
            : theme === 'error'
              ? 'bg-button-error-surface-default hover:bg-button-error-surface-hover active:bg-button-error-surface-pressed'
              : theme === 'success'
                ? 'bg-button-success-surface-default hover:bg-button-success-surface-hover active:bg-button-success-surface-pressed'
                : 'bg-button-neutral-surface-default hover:bg-button-neutral-surface-hover active:bg-button-neutral-surface-pressed'),

        // SECONDARY MODE
        mode === 'secondary' &&
          disabled &&
          (theme === 'brand'
            ? 'border-button-brand-border-disable text-button-brand-label-plain-disable border'
            : theme === 'error'
              ? 'border-button-error-border-disable text-button-error-label-plain-disable border'
              : theme === 'success'
                ? 'border-button-success-border-disable text-button-success-label-plain-disable border'
                : 'border-button-neutral-border-disable text-button-neutral-label-plain-disable border'),
        mode === 'secondary' &&
          isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'border-button-brand-border-loading text-button-brand-label-plain-loading border'
            : theme === 'error'
              ? 'border-button-error-border-loading text-button-error-label-plain-loading border'
              : theme === 'success'
                ? 'border-button-success-border-loading text-button-success-label-plain-loading border'
                : 'border-button-neutral-border-loading text-button-neutral-label-plain-loading'),
        mode === 'secondary' &&
          !isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'border-button-brand-border-default hover:border-button-brand-border-hover active:border-button-brand-border-pressed text-button-brand-label-plain-default active:bg-button-brand-surface-pressed hover:bg-button-brand-surface-hover hover:text-button-brand-label-onsurface border'
            : theme === 'error'
              ? 'border-button-error-border-default hover:border-button-error-border-hover active:border-button-error-border-pressed text-button-error-label-plain-default hover:bg-button-error-surface-hover hover:text-button-error-label-onsurface active:bg-button-error-surface-pressed border'
              : theme === 'success'
                ? 'border-button-success-border-default hover:border-button-success-border-hover active:border-button-success-border-pressed text-button-success-label-plain-default hover:bg-button-success-surface-hover hover:text-button-success-label-onsurface active:bg-button-success-surface-pressed border'
                : 'border-button-neutral-border-default hover:border-button-neutral-border-hover active:border-button-neutral-border-pressed text-button-neutral-label-plain-default hover:bg-button-neutral-surface-hover hover:text-button-neutral-label-onsurface active:bg-button-neutral-surface-pressed border'),

        // TEXT MODE
        mode === 'text' &&
          disabled &&
          (theme === 'brand'
            ? 'text-button-brand-label-plain-default'
            : theme === 'error'
              ? 'text-button-error-label-plain-default'
              : theme === 'success'
                ? 'text-button-success-label-plain-default'
                : 'text-button-neutral-label-plain-default'),
        mode === 'text' &&
          isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'border-button-brand-border-loading text-button-brand-label-plain-loading border'
            : theme === 'error'
              ? 'border-button-error-border-loading text-button-error-label-plain-loading border'
              : theme === 'success'
                ? 'border-button-success-border-loading text-button-success-label-plain-loading border'
                : 'border-button-neutral-border-loading text-button-neutral-label-plain-loading'),
        mode === 'text' &&
          !isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'text-button-brand-label-plain-default hover:border-button-brand-border-hover active:border-button-brand-border-pressed active:text-button-brand-label-plain-pressed hover:border'
            : theme === 'error'
              ? 'text-button-error-label-plain-default hover:border-button-error-border-hover active:border-button-error-border-pressed active:text-button-error-label-plain-pressed hover:border'
              : theme === 'success'
                ? 'text-button-success-label-plain-default hover:border-button-success-border-hover active:border-button-success-border-pressed active:text-button-success-label-plain-pressed hover:border'
                : 'text-button-neutral-label-plain-default hover:border-button-neutral-border-hover active:border-button-neutral-border-pressed active:text-button-neutral-label-plain-pressed hover:border'),

        // UNDERLINE MODE
        mode === 'underline' &&
          disabled &&
          (theme === 'brand'
            ? 'text-button-brand-label-plain-disable'
            : theme === 'error'
              ? 'text-button-error-label-plain-disable'
              : theme === 'success'
                ? 'text-button-success-label-plain-disable'
                : 'text-button-neutral-label-plain-disable'),
        mode === 'underline' &&
          isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'text-button-brand-label-plain-loading'
            : theme === 'error'
              ? 'text-button-error-label-plain-loading'
              : theme === 'success'
                ? 'text-button-success-label-plain-loading'
                : 'text-button-neutral-label-plain-loading'),
        mode === 'underline' &&
          !isLoading &&
          !disabled &&
          (theme === 'brand'
            ? 'text-button-brand-label-plain-default active:text-button-brand-label-plain-pressed active:border-button-brand-border-pressed hover:text-button-brand-label-plain-hover hover:border-button-brand-border-hover'
            : theme === 'error'
              ? 'text-button-error-label-plain-default active:text-button-error-label-plain-pressed active:border-button-error-border-pressed hover:text-button-error-label-plain-hover hover:border-button-error-border-hover'
              : theme === 'success'
                ? 'text-button-success-label-plain-default active:text-button-success-label-plain-pressed active:border-button-success-border-pressed hover:text-button-success-label-plain-hover hover:border-button-success-border-hover'
                : 'text-button-neutral-label-plain-default active:text-button-neutral-label-plain-pressed active:border-button-neutral-border-pressed hover:text-button-neutral-label-plain-hover hover:border-button-neutral-border-hover'),
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
                'underline-offset-8 transition-transform group-hover:underline',
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

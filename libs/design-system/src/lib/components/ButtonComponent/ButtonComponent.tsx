import { cn } from '../../../utils';
import { Icon } from '../IconComponent';
import { IconName } from '../IconComponent/Icon.types';
import { modes, sizesButton } from './ButtonComponent.constants';
import { ModeButton, SizeButton } from './ButtonComponent.types';

interface Props {
  iconRight?: IconName;
  iconLeft?: IconName;
  text: string;
  disable: boolean;
  loading: boolean;
  size: SizeButton;
  mode: ModeButton;
}

function getButtonClasses(
  mode: ModeButton,
  size: SizeButton,
  loading: boolean,
  disable: boolean
) {
  const baseClasses =
    'flex gap-2 group transition-all duration-300 items-center px-2';
  const sizeClass = sizesButton[size];
  const modeClasses = disable
    ? modes[mode].disable
    : loading
    ? modes[mode].loading
    : modes[mode].default;

  return cn(
    baseClasses,
    sizeClass,
    modeClasses,
    (disable || loading) && 'cursor-default'
  );
}

export function ButtonComponent({
  iconRight,
  iconLeft,
  text,
  mode,
  size = 'sm',
  disable,
  loading,
}: Props) {
  const buttonClasses = getButtonClasses(mode, size, loading, disable);

  return (
    <button className={buttonClasses}>
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
              mode === 'underline' &&
                !disable &&
                'transition-all pb-0.5 group-hover:border-b group-hover:border-b-brand-600'
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

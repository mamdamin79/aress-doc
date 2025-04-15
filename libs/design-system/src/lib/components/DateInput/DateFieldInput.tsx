import { cn } from '../../../utils/classNames.utils';
import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  ref: React.RefObject<HTMLInputElement>;
  activeInput: boolean;
}

export const DateFieldInput: React.FC<Props> = ({
  activeInput,
  ref,
  className,
  ...rest
}) => {
  return (
    <input
      className={cn(
        'outline-none border-none pb-0.5 -mx-1 placeholder:text-black block',
        className
      )}
      disabled={!activeInput}
      ref={ref}
      dir="rtl"
      type="text"
      {...rest}
    />
  );
};

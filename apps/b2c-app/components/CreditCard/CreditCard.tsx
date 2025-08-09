import { Button, Icon, cn } from 'design-system';
import { FC, useState, useEffect, useRef } from 'react';
import { useCustomToast } from 'design-system';
import BG_CARD_DARK from '@aress-assets/icons/pattern-dark.svg';
import BG_CARD_LIGHT from '@aress-assets/icons/pattern-light.svg';
import Image from 'next/image';
import { Props, bankInfo } from './CreditCard.types';
import { useThemeToggle } from '@shared/hooks/ToggleTheme';

// Utility function to validate arrays
const isValidArray = (arr: unknown[]): boolean =>
  Array.isArray(arr) &&
  arr.length > 0 &&
  arr.every((item) => item !== null && item !== undefined);

export const CreditCard: FC<Props> = ({
  bankIconName,
  userName,
  shabaNumber,
  accountNumber,
}) => {
  const [identifierType, setIdentifierType] = useState<'sheba' | 'hesab'>(
    'hesab',
  );
  const [copied, setCopied] = useState(false);
  const { showToast } = useCustomToast();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { theme } = useThemeToggle();

  // Cleanup timeout on unmount or when copied changes
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (copied) {
      timeoutRef.current = setTimeout(() => setCopied(false), 4000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [copied]);
  const handleCopy = async () => {
    if (copied) return;

    // Validate arrays before processing
    if (identifierType === 'sheba' && !isValidArray(shabaNumber)) {
      showToast({
        message: 'شماره شبا معتبر نیست.',
        type: 'error',
      });
      return;
    }

    if (identifierType === 'hesab' && !isValidArray(accountNumber)) {
      showToast({
        message: 'شماره حساب معتبر نیست.',
        type: 'error',
      });
      return;
    }

    const value =
      identifierType === 'sheba'
        ? shabaNumber.join('')
        : accountNumber.join('');

    if (!value) {
      showToast({
        message: 'هیچ شماره‌ای برای کپی وجود ندارد.',
        type: 'error',
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      showToast({
        message:
          identifierType === 'sheba'
            ? 'شماره شبا شما کپی شد.'
            : 'شماره حساب شما کپی شد.',
        type: 'success',
      });
    } catch (err) {
      console.error('کپی به کلیپ‌بورد ناموفق بود', err);
      showToast({
        message: 'کپی به کلیپ‌بورد ناموفق بود.',
        type: 'error',
      });
    }
  };
  const { icon, fa } = bankInfo[bankIconName];
  const toggleLabel = identifierType === 'sheba' ? 'شماره حساب' : 'شماره شبا';

  return (
    <div className="from-border-brand-soft-200 to-border-neutral-oninverse h-[200px] w-80 overflow-hidden rounded-2xl bg-gradient-to-r p-[1px]">
      <div className="text-text-neutral-white from-surface-brand-800-highcontrast to-surface-brand-500 relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-r px-7 py-[21px]">
        <div className="z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={icon} width={20} height={20} alt="bank logo" />
            <span className="text-shadow text-base font-semibold">{fa}</span>
          </div>
          <button
            onClick={handleCopy}
            className="relative flex h-6 w-6 items-center justify-center"
          >
            {/* Copy Icon */}
            <div
              className={cn(
                'absolute transition-all duration-300',
                copied ? 'scale-75 opacity-0' : 'scale-100 opacity-100',
              )}
            >
              <Icon name="copy" size="md" />
            </div>

            {/* Check Icon */}
            <div
              className={cn(
                'absolute transition-all duration-300',
                copied ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
              )}
            >
              <Icon name="check" size="md" />
            </div>
          </button>
        </div>

        <div className="z-10 flex select-none items-center justify-center gap-0.5">
          <div
            dir={identifierType === 'sheba' ? 'ltr' : 'rtl'}
            className={cn('flex items-center gap-[2px] text-lg font-semibold', {
              'gap-[15px]': identifierType === 'hesab',
            })}
          >
            {identifierType === 'sheba'
              ? isValidArray(shabaNumber) &&
                shabaNumber.map((item, index) => (
                  <span key={`${item}-${index}`} className="text-shadow pr-0.5">
                    {item}
                  </span>
                ))
              : isValidArray(accountNumber) &&
                [...accountNumber].reverse().map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    dir="rtl"
                    className="text-shadow flex items-center gap-[15px]"
                  >
                    {index !== 0 && '-'}
                    <span>{item}</span>
                  </div>
                ))}
          </div>
          <span className="text-shadow font-semibold">
            {identifierType === 'sheba' && 'IR'}
          </span>
        </div>

        <div className="z-10 flex items-center justify-between gap-2">
          <span className="text-shadow text-sm font-medium">{userName}</span>
          <Button
            onClick={() => {
              setCopied(false);
              setIdentifierType((prev) =>
                prev === 'hesab' ? 'sheba' : 'hesab',
              );
            }}
            className="bg-coloropacity-shadow-34per hover:border-border-neutral-oninverse hover:bg-coloropacity-shadow-34per h-[30px] w-fit whitespace-nowrap border border-transparent shadow-xl hover:border"
            align="center"
            isLoading={false}
            mode="primary"
            aria-label={toggleLabel}
            theme="brand"
            size="sm"
            iconRight={{ name: 'repeat', size: 'sm' }}
          >
            <span className="text-xs font-medium">{toggleLabel}</span>
          </Button>
        </div>

        <Image
          src={theme === 'dark' ? BG_CARD_DARK : BG_CARD_LIGHT}
          alt="bg-card"
          width={100}
          height={100}
          className="absolute right-0 top-0 z-0 h-full w-full"
        />
      </div>
    </div>
  );
};

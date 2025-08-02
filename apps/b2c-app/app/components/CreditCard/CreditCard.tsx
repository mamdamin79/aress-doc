import { Button, Icon, cn } from 'design-system';
import { FC, useState } from 'react';
import { useCustomToast } from 'design-system';
import BG_CARD_DARK from '@aress-assets/icons/pattern-dark.svg';
import BG_CARD_LIGHT from '@aress-assets/icons/pattern-light.svg';
import Image from 'next/image';
import { Props, bankInfo } from './CreditCard.types';
import { useThemeToggle } from '@shared/hooks/ToggleTheme';

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

  const { theme } = useThemeToggle();
  const handleCopy = async () => {
    if (copied) return;
    const value =
      identifierType === 'sheba'
        ? Array.isArray(shabaNumber)
          ? shabaNumber.join('')
          : ''
        : Array.isArray(accountNumber)
          ? accountNumber.join('')
          : '';

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
      setTimeout(() => setCopied(false), 4000);
    } catch (err) {
      console.error('کپی به کلیپ‌بورد ناموفق بود', err);
    }
  };
  const { icon, fa } = bankInfo[bankIconName];

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
              ? shabaNumber.map((item, index) => (
                  <span key={index} className="text-shadow pr-0.5">
                    {item}
                  </span>
                ))
              : [...accountNumber].reverse().map((item, index) => (
                  <div
                    key={index}
                    dir="rtl"
                    className="text-shadow flex items-center gap-[15px]"
                  >
                    {index !== 0 && '-'}
                    <span>{item}</span>
                  </div>
                ))}
          </div>
          <span>{identifierType === 'sheba' && 'IR'}</span>
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
            className="bg-coloropacity-shadow-34per hover:border-border-neutral-oninverse hover:bg-coloropacity-shadow-34per w-fit whitespace-nowrap border border-transparent shadow-xl hover:border"
            align="center"
            aria-label="copy number"
            isLoading={false}
            mode="primary"
            theme="brand"
            size="sm"
            iconRight={{ name: 'repeat' }}
          >
            {identifierType === 'sheba' ? 'شماره حساب' : 'شماره شبا'}
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

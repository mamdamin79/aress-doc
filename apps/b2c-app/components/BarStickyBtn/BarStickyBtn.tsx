import React, { useState } from 'react';
import { cn, Icon, Button } from 'design-system';

export interface BarStickyBtnProps {
  fundLogo?: string;
  title?: string;
  sellAble?: boolean;
}

export const BarStickyBtn: React.FC<BarStickyBtnProps> = ({
  fundLogo,
  sellAble,
  title,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="relative z-10">
      <div className="bg-surface-neutral-primary border-border-neutral-primary shadow-3xl flex w-[458px] flex-row items-center justify-between gap-6 rounded-xl border p-3">
        <div className="flex flex-row items-center gap-2">
          <div className="bg-surface-neutral-secondary h-[38px] w-[38px] rounded-full">
            {fundLogo && (
              <img
                alt={title ?? 'fund logo'}
                src={fundLogo}
                width={38}
                height={38}
              />
            )}
          </div>
          <div className="text-md max-w-[270px] truncate font-medium">
            {title}
          </div>
        </div>

        <div className="relative flex flex-col items-center">
          {/* Floating animated buttons */}
          <div
            className={cn(
              'absolute bottom-11 flex flex-col gap-1.5 transition-all duration-300',
              isDrawerOpen
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-2 opacity-0',
            )}
          >
            <Button
              theme="brand"
              align="center"
              isLoading={false}
              mode="primary"
              size="md"
              className="text-text-neutral-white h-[38px] w-24"
            >
              خرید
            </Button>
            {sellAble && (
              <Button
                theme="brand"
                align="center"
                isLoading={false}
                mode="primary"
                size="md"
                className="text-text-neutral-white h-[38px] w-24"
              >
                فروش
              </Button>
            )}
          </div>

          {/* معامله button */}
          <button
            className={cn(
              'bg-button-brand-surface-default text-text-neutral-white hover:bg-button-brand-surface-hover flex h-[38px] w-24 items-center justify-center gap-2 rounded-md px-2 py-1 transition-all',
              isDrawerOpen &&
                'border-button-brand-border-default text-button-brand-label-plain-default hover:bg-button-brand-surface-default hover:text-text-neutral-white border bg-transparent',
            )}
            onClick={() => setIsDrawerOpen((prev) => !prev)}
          >
            {!isDrawerOpen ? 'معامله' : <Icon name="x" size="md" />}
          </button>
        </div>
      </div>
    </div>
  );
};

import { Badge, BadgeProps } from 'design-system';
import React from 'react';
interface FundProps {
  name: string;
  logo: string;
  fundCategory: 'سهامی' | 'درآمد ثابت' | 'مختلط' | 'کالایی';
}

export const FundCard: React.FC<FundProps> = ({ fundCategory, logo, name }) => {
  const themeMap: Record<FundProps['fundCategory'], string> = {
    سهامی: 'green',
    'درآمد ثابت': 'blue',
    مختلط: 'purple',
    کالایی: 'yellow',
  };

  return (
    <div className="border-border-neutral-primary flex w-full items-center justify-between rounded-2xl border px-4 py-2">
      <div className="flex items-center gap-2">
        <img
          src={logo ?? ''}
          alt={`${name} logo`}
          className="h-[38px] w-[38px] rounded-full"
        />
        <span className="text-sm font-medium">{name}</span>
      </div>
      <Badge
        theme={themeMap[fundCategory] as BadgeProps['theme']}
        title={fundCategory}
      />
    </div>
  );
};

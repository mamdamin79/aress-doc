'use client';

import React from 'react';
import { ConfirmModal } from 'design-system';

interface EmptyPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuyFunds: () => void;
  categoryType?: number | null;
}

const categoryNames: Record<number, string> = {
  0: 'سهامی',
  1: 'درآمد ثابت',
  2: 'مختلط',
  3: 'کالایی',
};

export const EmptyPortfolioModal: React.FC<EmptyPortfolioModalProps> = ({
  isOpen,
  onClose,
  onBuyFunds,
  categoryType,
}) => {
  const handleConfirm = () => {
    onBuyFunds();
    onClose();
  };

  const categoryName =
    categoryType !== null && categoryType !== undefined
      ? categoryNames[categoryType]
      : 'سهامی';

  return (
    <ConfirmModal
      narrow={true}
      isOpen={isOpen}
      onClose={onClose}
      title={`شما هنوز هیچ صندوق ${categoryName} خریداری نکرده‌اید.`}
      description={
        <p className="text-text-neutral-secondarycontrast text-sm">
          برای مشاهده و خرید صندوق‌های {categoryName} لطفاً به صفحه مربوط مراجعه
          کنید.
        </p>
      }
      onConfirm={handleConfirm}
      submitBtnLabel="خرید و فروش صندوق"
      cancelBtnLabel="بازگشت"
    />
  );
};

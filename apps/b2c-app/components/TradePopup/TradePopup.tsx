'use client';
import React, { useState } from 'react';
import { Dialog, Button, TextField, Icon } from 'design-system';
import { cn } from 'design-system';

export interface TradePopupProps {
  isOpen: boolean;
  onClose: () => void;
  fundName?: string;
  currentPrice?: number;
  minInvestment?: number;
  maxInvestment?: number;
  unitPrice?: number;
}

export const TradePopup: React.FC<TradePopupProps> = ({
  isOpen,
  onClose,
  fundName = 'مشترک افق روشن کارگزاری بانک خاورمیانه',
  currentPrice = 152000000,
  minInvestment = 15000000,
  maxInvestment = 1000,
  unitPrice = 10000,
}) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showQuantityDropdown, setShowQuantityDropdown] = useState(false);

  const quantityOptions = [
    5000000, 10000000, 50000000, 100000000, 500000000, 1000000000,
  ];

  const formatNumber = (num: number) => {
    return num.toLocaleString('fa-IR');
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    setShowQuantityDropdown(false);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} className="w-full max-w-md">
      <div className="space-y-6">
        {/* Header with Tabs */}
        <div className="bg-surface-neutral-secondary flex rounded-lg p-1">
          <button
            onClick={() => setActiveTab('buy')}
            className={cn(
              'flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors',
              activeTab === 'buy'
                ? 'bg-surface-accent-green-600-90per text-text-neutral-primary'
                : 'text-text-neutral-secondary hover:text-text-neutral-primary',
            )}
          >
            خرید واحد
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={cn(
              'flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors',
              activeTab === 'sell'
                ? 'bg-surface-accent-red-600-90per text-text-neutral-primary'
                : 'text-text-neutral-secondary hover:text-text-neutral-primary',
            )}
          >
            فروش واحد
          </button>
        </div>

        {/* Fund Name */}
        <div className="text-center">
          <div className="bg-surface-neutral-secondary inline-flex items-center gap-2 rounded-full px-4 py-2">
            <span className="text-text-neutral-secondary text-sm">سهامی</span>
            <span className="text-sm font-medium">{fundName}</span>
          </div>
        </div>

        {/* Investment Amount Input */}
        <div className="space-y-2">
          <label className="text-text-neutral-primary text-sm font-medium">
            مبلغ سرمایه‌گذاری را وارد کنید.
          </label>
          <TextField
            mergeTitleAndPlaceholder
            mode="filled"
            trailingIcons={[]}
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            placeholder="کم تغییر"
            className="text-center"
          />
        </div>

        {/* Price Display */}
        <div className="text-center">
          <div className="text-text-neutral-primary text-2xl font-bold">
            {formatNumber(currentPrice)} <span className="text-lg">ریال</span>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={incrementQuantity}
              className="bg-surface-accent-blue-600-90per text-text-neutral-primary hover:bg-surface-accent-blue-600-80per flex h-8 w-8 items-center justify-center rounded-full"
            >
              <Icon name="plus" size="sm" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowQuantityDropdown(!showQuantityDropdown)}
                className="border-border-neutral-secondary bg-surface-neutral-primary text-text-neutral-primary hover:bg-surface-neutral-secondary flex items-center gap-2 rounded-lg border px-4 py-2"
              >
                <span>{formatNumber(quantity * unitPrice)}</span>
                <Icon name="chevron-down" size="sm" />
              </button>

              {showQuantityDropdown && (
                <div className="border-border-neutral-secondary bg-surface-neutral-primary absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border shadow-lg">
                  {quantityOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleQuantityChange(option / unitPrice)}
                      className="text-text-neutral-primary hover:bg-surface-neutral-secondary w-full px-4 py-2 text-right first:rounded-t-lg last:rounded-b-lg"
                    >
                      {formatNumber(option)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="bg-surface-accent-blue-600-90per text-text-neutral-primary hover:bg-surface-accent-blue-600-80per flex h-8 w-8 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="minus" size="sm" />
            </button>
          </div>

          <div className="text-text-neutral-secondary text-center text-sm">
            معادل پاداش میلیون تومان
          </div>
        </div>

        {/* Investment Limits */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-neutral-secondary">
              حداقل قیمت خرید:
            </span>
            <span className="text-text-neutral-primary">
              {formatNumber(minInvestment)} ریال
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-neutral-secondary">
              حداکثر تعداد واحد:
            </span>
            <span className="text-text-neutral-primary">
              {formatNumber(maxInvestment)} واحد
            </span>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="border-border-neutral-secondary text-surface-accent-blue-600-90per focus:ring-surface-accent-blue-600-50per mt-1 h-4 w-4 rounded"
          />
          <label
            htmlFor="terms"
            className="text-text-neutral-secondary text-sm"
          >
            استراتژی‌نامه و اعتبارنامه را مطالعه کرده‌ام و پیامد ریسک را قبول
            دارم.
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            mode="secondary"
            theme="neutral"
            onClick={onClose}
            className="flex-1"
          >
            بازگشت
          </Button>
          <Button
            mode="primary"
            theme={activeTab === 'buy' ? 'success' : 'error'}
            disabled={!acceptTerms}
            className="flex-1"
          >
            {activeTab === 'buy' ? 'ادامه خرید' : 'ادامه فروش'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

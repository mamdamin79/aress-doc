import React, { useState, useCallback } from 'react';

import { ConfirmModalProps } from './ConfirmModal.types';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { cn } from '../../../utils/classNames.utils';
import { Dialog } from '../Dialog';
import { TextField } from '../TextField';

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  input,
  checkBoxText = 'باز کردن در تب جدید',
  onConfirm,
  isOpen,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [checked, setChecked] = useState(false);
  const isWithInput = typeof input !== 'undefined';
  const handleConfirm = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!isWithInput) {
        onConfirm({ checked: true });
      } else {
        onConfirm({ checked, input: inputValue });
      }
      onClose?.();
    },
    [inputValue, checked, onConfirm, isWithInput],
  );
  return (
    <Dialog isOpen={isOpen} onClose={() => onClose?.()}>
      <div className="w-[472px] text-right">
        <form onSubmit={handleConfirm} className="flex flex-col gap-4">
          <div className="text-lg font-semibold">{title}</div>
          {isWithInput && (
            <div className="flex flex-col">
              <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
                label={input.label}
                placeholder={input.placeholder}
                mergeTitleAndPlaceholder={false}
                mode="outline"
                id="confirm-modal-input"
                trailingIcons={[]}
              />
            </div>
          )}
          {/* Checkbox */}
          {checkBoxText && (
            <div className="flex items-center text-sm font-medium">
              <Checkbox
                checked={checked}
                id="confirm-modal-checkbox"
                onChange={() => setChecked(!checked)}
              ></Checkbox>
              <label htmlFor="confirm-modal-checkbox">{checkBoxText}</label>
            </div>
          )}
          {/* Handle Submit or Cancel */}
          <div className="flex justify-end gap-2">
            <div className="min-w-14">
              <Button
                align="center"
                isLoading={false}
                size="sm"
                mode="secondary"
                onClick={() => onClose?.()}
                type="button"
              >
                انصراف
              </Button>
            </div>
            <div className="min-w-14">
              <Button
                align="center"
                isLoading={false}
                mode="primary"
                size="sm"
                type={!inputValue && isWithInput ? 'button' : 'submit'}
                disabled={Boolean(!inputValue && isWithInput)}
                className={cn(
                  !inputValue && isWithInput
                    ? 'bg-brand-300 cursor-not-allowed'
                    : 'bg-brand-600 hover:bg-brand-700',
                )}
              >
                ذخیره
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

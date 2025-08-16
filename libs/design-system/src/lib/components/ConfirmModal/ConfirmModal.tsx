'use client';
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
  checkBoxText,
  onConfirm,
  isOpen,
  onClose,
  submitBtnLabel = 'ذخیره',
  cancelBtnLabel = 'انصراف',
  description,
  narrow = false,
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
        <form
          onSubmit={handleConfirm}
          className={cn(
            'flex flex-col gap-10',
            checkBoxText && 'gap-4',
            !checkBoxText && !isWithInput && 'gap-6',
          )}
        >
          <div className="flex flex-col gap-4">
            <div className="text-lg font-semibold">{title}</div>
            {description}
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
              <div className="mr-1 flex items-center text-sm font-medium">
                <Checkbox
                  checked={checked}
                  id="confirm-modal-checkbox"
                  onChange={() => setChecked(!checked)}
                  content={checkBoxText}
                ></Checkbox>
              </div>
            )}
          </div>

          {/* Handle Submit or Cancel */}
          <div
            className={cn(
              'flex justify-end gap-2',
              narrow && 'flex-col-reverse gap-2',
            )}
          >
            <div className="min-w-14">
              <Button
                align="center"
                isLoading={false}
                size={narrow ? 'md' : 'sm'}
                mode="secondary"
                onClick={() => onClose?.()}
                type="button"
                className="text-md px-4 font-medium"
              >
                {cancelBtnLabel}
              </Button>
            </div>
            <div className="min-w-14">
              <Button
                align="center"
                isLoading={false}
                mode="primary"
                size={narrow ? 'md' : 'sm'}
                type={!inputValue && isWithInput ? 'button' : 'submit'}
                disabled={Boolean(!inputValue && isWithInput)}
                className={cn(
                  'text-md px-4 font-medium',
                  !inputValue && isWithInput
                    ? 'bg-button-brand-surface-disable cursor-not-allowed'
                    : 'bg-button-brand-surface-default hover:bg-button-brand-surface-hover',
                )}
              >
                {submitBtnLabel}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

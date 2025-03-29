import React, { useState, useCallback } from 'react';

import { Icon } from '../Icon';
import { ConfirmModalProps } from './ConfirmModal.types';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { cn } from '../../../utils/classNames.utils';
import { Dialog } from '../Dialog';
import { TextField } from '../TextField';

const CustomComponent: React.FC<ConfirmModalProps> = ({
  title,
  input,
  checkBoxText,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}) => {
  const [isOpen, setIsOpen] = useState(true);
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
      setIsOpen(false);
    },
    [inputValue, checked, onConfirm, isWithInput],
  );

  const handleCancel = useCallback(() => {
    if (onCancel) onCancel();
    setIsOpen(false);
  }, [onCancel]);
  return (
    <Dialog isOpen={isOpen} onClose={handleCancel}>
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
                trailingIcons={[]}
              />
            </div>
          )}
          {/* Checkbox */}
          {/* {checkBoxText && (
              <Field className="flex items-center text-sm font-medium">
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                ></Checkbox>
                <Label>{checkBoxText}</Label>
              </Field>
            )} */}
          {/* Handle Submit or Cancel */}
          <div className="flex justify-end gap-2">
            <div className="min-w-14">
              <Button
                align="center"
                isLoading={false}
                size="sm"
                mode="secondary"
                onClick={handleCancel}
                type="button"
              >
                {cancelButtonText}
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
                {confirmButtonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default CustomComponent;

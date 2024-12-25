import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Label,
  Field,
  Input,
  Description,
} from '@headlessui/react';
import { Icon } from '../Icon';
import { ConfirmModalProps } from './ConfirmModal.types';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { cn } from '../../../utils/classNames.utils';

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
    <Dialog open={isOpen} onClose={handleCancel} className="relative z-50">
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative w-[472px] bg-white shadow-lg rounded-2xl font-vazirmatn flex flex-col gap-4 p-6">
          {/* Close Button */}
          <div
            className="absolute top-0 left-0 -mt-2 -ml-2 flex justify-center items-center shadow-sm rounded-full"
            onClick={handleCancel}
          >
            <Icon name="CustomCirlcleX" size="lg_plus" />
          </div>
          {/* Dialog Title */}
          <DialogTitle className="text-lg font-semibold h-8">
            {title}
          </DialogTitle>
          <form onSubmit={handleConfirm} className=" flex flex-col gap-4">
            {/* Input Field */}
            {isWithInput && (
              <div className="flex flex-col gap-1">
                <Description className="block text-sm font-medium text-gray-1000">
                  {input.label}
                </Description>
                <Field>
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="h-14 w-full outline-none border-2 rounded-xl py-2 px-4 focus:border-[2.5px] focus:border-brand-600 focus:outline-none"
                    autoFocus
                    placeholder={input.placeholder}
                  />
                </Field>
              </div>
            )}
            {/* Checkbox */}
            {checkBoxText && (
              <Field className="flex items-center text-sm font-medium">
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                ></Checkbox>
                <Label>{checkBoxText}</Label>
              </Field>
            )}
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
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CustomComponent;

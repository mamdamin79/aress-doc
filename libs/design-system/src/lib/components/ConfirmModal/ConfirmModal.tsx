import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Label,
  Field,
  Input,
  Checkbox,
  Description,
} from '@headlessui/react';
import { Icon } from '../Icon';
import { ConfirmModalProps } from './ConfirmModal.types';

const CustomComponent: React.FC<ConfirmModalProps> = ({
  title,
  input,
  CheckboxText,
  ConfirmButtonText,
  CancelButtonText,
  onConfirm,
  onCancel,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [checked, setChecked] = useState(false);

  const handleConfirm = useCallback(() => {
    if (!input?.placeholder) {
      onConfirm({ checked: true });
    } else {
      onConfirm({ checked, input: inputValue });
    }
    setIsOpen(false);
  }, [inputValue, checked, onConfirm]);

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
          <div className="absolute top-0 left-0 -mt-2 -ml-2 w-8 h-8 bg-brand-600 rounded-full flex justify-center items-center shadow-sm">
            <button
              onClick={handleCancel}
              className="bg-white rounded-full shadow-lg w-6 h-6 flex justify-center items-center"
              aria-label="Close"
            >
              <Icon name="x" key="x" size="md" />
            </button>
          </div>
          {/* Dialog Title */}
          <DialogTitle className="text-lg font-semibold h-8">
            {title}
          </DialogTitle>
          {/* Input Field */}
          {input && (
            <div className="flex flex-col gap-1">
              <Description className="block text-sm font-medium text-gray-700">
                {input.label}
              </Description>
              {input.placeholder && (
                <Field>
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="h-14 w-full outline-none border-2 rounded-xl py-2 px-4 focus:border-brand-600 focus:outline-none"
                    autoFocus
                    placeholder={input.placeholder}
                  />
                </Field>
              )}
            </div>
          )}
          {/* Checkbox */}
          {CheckboxText && (
            <Field className="flex items-center text-sm font-medium text-gray-700 gap-2">
              <Checkbox
                checked={checked}
                onChange={setChecked}
                className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
              >
                {/* Checkmark icon */}
                <svg
                  className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <Label>{CheckboxText}</Label>
            </Field>
          )}
          {/* Handle Submit or Cancel */}
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="flex justify-center items-center py-2 px-4 gap-2 border-2 border-brand-600 rounded-md text-brand-600 text-base leading-6 text-center hover:bg-gray-100 transition-colors"
            >
              {CancelButtonText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={Boolean(!inputValue && input?.placeholder)}
              className={`${
                !inputValue && input?.placeholder
                  ? 'bg-brand-300 cursor-not-allowed'
                  : 'bg-brand-600 hover:bg-brand-700'
              } flex justify-center items-center py-2 px-4 gap-2 rounded-md text-white text-base leading-6 text-center transition-colors`}
            >
              {ConfirmButtonText}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CustomComponent;

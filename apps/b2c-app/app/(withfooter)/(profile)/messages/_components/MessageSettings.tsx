'use client';
import { Button } from '@headlessui/react';
import {
  Accordion,
  AccordionItem,
  cn,
  Dialog,
  Icon,
  SwitchComponent,
} from 'design-system';
import React, { useState } from 'react';

export const MessageSettings: React.FC = () => {
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  const [settings, setSettings] = useState<{
    transactions: { sms: boolean; email: boolean };
    reports: { sms: boolean; email: boolean };
    responses: { sms: boolean; email: boolean };
    activities: { sms: boolean; email: boolean };
    marketing: { sms: boolean; email: boolean };
    security: { sms: boolean; email: boolean };
  }>({
    transactions: { sms: false, email: false },
    reports: { sms: false, email: false },
    responses: { sms: false, email: false },
    activities: { sms: false, email: false },
    marketing: { sms: false, email: false },
    security: { sms: false, email: false },
  });

  const handleValueChange = (
    sectionId:
      | 'transactions'
      | 'reports'
      | 'responses'
      | 'activities'
      | 'marketing'
      | 'security',
    optionId: 'sms' | 'email',
    value: boolean,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [optionId]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log('Send to server:', settings);
  };

  return (
    <>
      <Button onClick={() => setIsOpenSetting(true)}>
        <Icon name="settings" size="lg" />
      </Button>
      <Dialog
        onClose={() => setIsOpenSetting(false)}
        isOpen={isOpenSetting}
        showCloseBtn={true}
      >
        <div className="text-text-neutral-primary border-border-neutral-primary border-b-2 pb-4 text-right text-lg font-medium">
          تنظیمات اطلاع‌رسانی
        </div>
        <Accordion
          mode="b2c"
          className="-space-y-6"
          allowMultiple
          items={[
            SwitchAccordion({
              id: 'transactions',
              title: 'تراکنش‌ها',
              options: [
                { id: 'sms', label: 'پیامک', value: '', disabled: false },
                { id: 'email', label: 'ایمیل', value: '', disabled: false },
              ],
              selectedValues: Object.entries(settings.transactions)
                .filter(([, val]) => val)
                .map(([key]) => key),
              onValueChange: (optionId, value) =>
                handleValueChange(
                  'transactions',
                  optionId as 'sms' | 'email',
                  value,
                ),
            }),
            SwitchAccordion({
              id: 'reports',
              title: 'گزارش‌ها',
              options: [
                { id: 'sms', label: 'پیامک', value: '', disabled: false },
                { id: 'email', label: 'ایمیل', value: '', disabled: false },
              ],
              selectedValues: Object.entries(settings.reports)
                .filter(([, val]) => val)
                .map(([key]) => key),
              onValueChange: (optionId, value) =>
                handleValueChange(
                  'reports',
                  optionId as 'sms' | 'email',
                  value,
                ),
            }),
            SwitchAccordion({
              id: 'responses',
              title: 'پاسخ‌ها',
              options: [
                { id: 'sms', label: 'پیامک', value: '', disabled: false },
                { id: 'email', label: 'ایمیل', value: '', disabled: false },
              ],
              selectedValues: Object.entries(settings.responses)
                .filter(([, val]) => val)
                .map(([key]) => key),
              onValueChange: (optionId, value) =>
                handleValueChange(
                  'responses',
                  optionId as 'sms' | 'email',
                  value,
                ),
            }),
            SwitchAccordion({
              id: 'activities',
              title: 'فعالیت ها',
              options: [
                { id: 'sms', label: 'پیامک', value: '', disabled: false },
                { id: 'email', label: 'ایمیل', value: '', disabled: false },
              ],
              selectedValues: Object.entries(settings.activities)
                .filter(([, val]) => val)
                .map(([key]) => key),
              onValueChange: (optionId, value) =>
                handleValueChange(
                  'activities',
                  optionId as 'sms' | 'email',
                  value,
                ),
            }),
            SwitchAccordion({
              id: 'marketing',
              title: 'بازاریابی',
              options: [
                { id: 'sms', label: 'پیامک', value: '', disabled: false },
                { id: 'email', label: 'ایمیل', value: '', disabled: false },
              ],
              selectedValues: Object.entries(settings.marketing)
                .filter(([, val]) => val)
                .map(([key]) => key),
              onValueChange: (optionId, value) =>
                handleValueChange(
                  'marketing',
                  optionId as 'sms' | 'email',
                  value,
                ),
            }),
            SwitchAccordion({
              id: 'security',
              title: 'امنیتی',
              options: [
                { id: 'sms', label: 'پیامک', value: '', disabled: false },
                { id: 'email', label: 'ایمیل', value: '', disabled: false },
              ],
              selectedValues: Object.entries(settings.security)
                .filter(([, val]) => val)
                .map(([key]) => key),
              onValueChange: (optionId, value) =>
                handleValueChange(
                  'security',
                  optionId as 'sms' | 'email',
                  value,
                ),
            }),
          ]}
        />

        <div className="mt-4 flex justify-end">
          <Button onClick={handleSave}>ذخیره</Button>
        </div>
      </Dialog>
    </>
  );
};

export interface SwitchOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SwitchSection {
  id: string;
  title: string;
  options: SwitchOption[];
  selectedValues: string[];
  onValueChange: (id: string, value: boolean) => void;
}

export const SwitchAccordion = (section: SwitchSection): AccordionItem => {
  return {
    trigger: (isOpen: boolean) => (
      <div className="text-text-neutral-primary bg-surface-neutral-background hover:bg-surface-brand-100 flex h-16 w-[416px] items-center justify-between rounded-2xl px-2 transition-colors">
        <span className="text-md font-semibold">{section.title}</span>
        <span
          className={cn(
            'text-icon-neutral-primary group-hover:text-icon-brand-primary-600 flex items-center justify-center transition-transform duration-300',
            {
              'rotate-0': !isOpen,
              'rotate-180': isOpen,
            },
          )}
        >
          <Icon name="chevron-down" size="lg" />
        </span>
      </div>
    ),
    content: (
      <div className="flex flex-col">
        {section.options.map((option) => (
          <div
            key={option.id}
            className="hover:bg-surface-brand-100 flex items-center justify-between rounded-2xl px-2 py-3 transition-all duration-150"
          >
            <span className="text-text-neutral-primary">{option.label}</span>
            <SwitchComponent
              checked={section.selectedValues.includes(option.id)}
              isDisabled={option.disabled}
              onChange={(val: boolean) => section.onValueChange(option.id, val)}
            />
          </div>
        ))}
      </div>
    ),
  };
};

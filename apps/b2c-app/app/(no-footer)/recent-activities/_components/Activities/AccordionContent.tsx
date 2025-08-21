import { formatNumber, Icon, ProgressBar } from 'design-system';
import React from 'react';
import type {
  AccordionContentData,
  DetailItem,
  HeaderItem,
  PaymentMethod,
  ProgressItem,
  RequestMethod,
  StepData,
  TransactionStatus,
} from './Activities.types';

// Reusable components
const AccordionContentContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    <div className="flex h-8 w-full items-center">
      <div className="border-border-neutral-secondary w-full border-b"></div>
    </div>
    <div className="text-text-neutral-primary flex flex-col gap-5 px-4">
      {children}
    </div>
  </>
);

const AccordionContentHead: React.FC<{
  items: HeaderItem[];
}> = ({ items }) => (
  <div className="flex flex-col gap-1">
    {items.map((item, index) => (
      <div key={index} className="flex w-full justify-between">
        <span className="text-text-neutral-primary text-md font-semibold">
          {item.title}
        </span>
        <span className="text-text-neutral-secondarycontrast text-md font-medium">
          {item.value}
        </span>
      </div>
    ))}
  </div>
);

const InfoMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-text-neutral-secondary -mt-4 flex items-center justify-start gap-1">
    <Icon name="info" size="sm" />
    <span>{message}</span>
  </div>
);

const DetailRow: React.FC<{ item: DetailItem }> = ({ item }) => (
  <div className="flex w-full flex-row justify-between">
    <span className="text-text-neutral-secondarycontrast text-sm font-semibold">
      {item.label}
    </span>
    <span className="text-text-neutral-secondary text-sm font-medium">
      {typeof item.value === 'number'
        ? formatNumber(item.value, {
            commaSeparated: true,
            decimals: 0,
          })
        : item.value}
      {item.unit && ` ${item.unit}`}
    </span>
  </div>
);

const StepSection: React.FC<{ step: StepData }> = ({ step }) => (
  <>
    <div className="text-md flex w-full flex-row justify-between">
      <span className="font-semibold">{step.title}</span>
      {step.timestamp && (
        <span className="text-text-neutral-secondarycontrast font-medium">
          {step.timestamp}
        </span>
      )}
    </div>
    {step.details && step.details.length > 0 && (
      <div className="flex flex-col gap-1 text-sm font-semibold">
        {step.details.map((detail, index) => (
          <DetailRow key={index} item={detail} />
        ))}
      </div>
    )}
  </>
);

const TimelineContent: React.FC<{
  progressItems: ProgressItem[];
  activeIndex: number;
  steps: StepData[];
}> = ({ progressItems, activeIndex, steps }) => (
  <div className="flex flex-row gap-3">
    <div className="mr-5 mt-5">
      <ProgressBar
        orientation="vertical"
        activeIndex={activeIndex}
        progressBarItems={progressItems}
      />
    </div>
    <div className="text-md mr-4 flex w-full flex-col gap-2">
      {steps.map((step, index) => (
        <StepSection key={index} step={step} />
      ))}
    </div>
  </div>
);

// Base accordion component that all specific components use
const BaseAccordionContent: React.FC<{
  headerItems: HeaderItem[];
  data: AccordionContentData;
  infoMessage?: string;
}> = ({ headerItems, data, infoMessage }) => (
  <AccordionContentContainer>
    <AccordionContentHead items={headerItems} />
    {infoMessage && <InfoMessage message={infoMessage} />}
    <TimelineContent
      progressItems={data.progressItems}
      activeIndex={data.activeIndex}
      steps={data.steps}
    />
  </AccordionContentContainer>
);

// Common data generators
const createProgressItems = (
  statuses: Array<'success' | 'error'>,
  heights: number[] = [131, 131, 16],
): ProgressItem[] =>
  statuses.map((status, index) => ({
    text: '',
    status,
    height: heights[index] || 16,
  }));

const createTransactionDetails = (
  volume?: number,
  price?: number,
  amount?: number,
  unit: string = 'واحد',
  currency: string = 'ریال',
  prefix: string = 'تقریبی',
): DetailItem[] => [
  { label: `حجم ${prefix}`, value: volume || 12, unit },
  { label: `قیمت ${prefix}`, value: price || 4510, unit: currency },
  { label: `مبلغ ${prefix}`, value: amount || 41000000, unit: currency },
];

const createPaymentDetails = (
  paymentMethod: string,
  bankName: string = 'بانک سامان',
  requestMethod: RequestMethod = 'توسط مشتری',
  amount: number = 45000000,
): DetailItem[] => [
  { label: 'روش پرداخت', value: paymentMethod },
  { label: 'نام بانک', value: bankName },
  { label: 'نوع درخواست', value: requestMethod },
  { label: 'مبلغ', value: amount, unit: 'ریال' },
];

// Buy Order Component
export const AccordionContentBuy: React.FC<{
  data?: Partial<AccordionContentData>;
}> = ({ data }) => {
  const defaultData: AccordionContentData = {
    orderNumber: '1223434',
    estimatedDate: '1404/01/01',
    progressItems: createProgressItems(['success', 'success', 'error']),
    activeIndex: 1,
    steps: [
      {
        title: 'دستور خرید',
        timestamp: '1404/2/1',
        details: createTransactionDetails(
          12,
          4510,
          41000000,
          'واحد',
          'ریال',
          'تقریبی',
        ),
      },
      {
        title: 'تایید مدیر صندوق',
        timestamp: '16:40 - 1404/2/1',
        details: createTransactionDetails(
          12,
          4510,
          41000000,
          'واحد',
          'ریال',
          'نهایی',
        ),
      },
      {
        title: 'دستور خرید اعمال شد',
        timestamp: '16:50 - 1404/2/1',
      },
    ],
  };

  const mergedData = { ...defaultData, ...data };

  return (
    <BaseAccordionContent
      headerItems={[
        { title: 'شماره سفارش', value: mergedData.orderNumber },
        {
          title: 'تخمین اعمال دستور خرید',
          value: mergedData.estimatedDate || '',
        },
      ]}
      data={mergedData}
      infoMessage="بعد از تایید مبلغ نهایی توسط مدیر، مابالاتفاوت مبلغ تقریبی و نهایی به حسابتان بازگردانده می‌شود."
    />
  );
};

// Sell Order Component
export const AccordionContentSell: React.FC<{
  data?: Partial<AccordionContentData>;
}> = ({ data }) => {
  const defaultData: AccordionContentData = {
    orderNumber: '1316532',
    estimatedDate: '1404/2/8',
    progressItems: createProgressItems(['success', 'success', 'success']),
    activeIndex: 2,
    steps: [
      {
        title: 'زمان دستور فروش',
        timestamp: '1404/2/1',
        details: [
          { label: 'حجم نهایی', value: 12, unit: 'واحد' },
          { label: 'قیمت تقریبی', value: 4510, unit: 'ریال' },
          { label: 'مبلغ تقریبی', value: 45000000, unit: 'ریال' },
        ],
      },
      {
        title: 'تایید مدیر صندوق',
        timestamp: '16:05 - 1404/2/13',
        details: [
          { label: 'حجم نهایی', value: 11, unit: 'واحد' },
          { label: 'قیمت نهایی', value: 4240, unit: 'ریال' },
          { label: 'مبلغ نهایی', value: 41000000, unit: 'ریال' },
        ],
      },
      {
        title: 'دستور فروش اعمال شد',
        timestamp: '16:05 - 1404/2/13',
      },
    ],
  };

  const mergedData = { ...defaultData, ...data };

  return (
    <BaseAccordionContent
      headerItems={[
        { title: 'شماره سفارش', value: mergedData.orderNumber },
        { title: 'تخمین زمان فروش', value: mergedData.estimatedDate || '' },
      ]}
      data={mergedData}
      infoMessage="مبلغ نهایی پس از تأیید مدیر، به حساب شما واریز می‌گردد."
    />
  );
};

// Dividend Payment Component
export const AccordionContentDividend: React.FC<{
  data?: Partial<AccordionContentData>;
}> = ({ data }) => {
  const defaultData: AccordionContentData = {
    orderNumber: '1316532',
    progressItems: [{ text: '', status: 'success', height: 160 }],
    activeIndex: 1,
    steps: [
      {
        title: 'پرداخت وجه',
        timestamp: '1404/2/1',
        details: [
          ...createPaymentDetails('درگاه بانکی', 'بانک ساتان', 'توسط صندوق'),
          { label: 'سود هر واحد', value: 4555, unit: 'ریال' },
        ],
      },
    ],
  };

  const mergedData = { ...defaultData, ...data };

  return (
    <BaseAccordionContent
      headerItems={[{ title: 'شماره سفارش', value: mergedData.orderNumber }]}
      data={mergedData}
    />
  );
};

// Deposit Component
export const AccordionContentDeposit: React.FC<{
  data?: Partial<AccordionContentData>;
  paymentMethod?: PaymentMethod;
}> = ({ data, paymentMethod = 'فیش بانکی' }) => {
  const defaultData: AccordionContentData = {
    orderNumber: '1316542',
    progressItems: createProgressItems(['success', 'success'], [160, 16]),
    activeIndex: 1,
    steps: [
      {
        title: 'واریز وجه',
        timestamp: '1404/2/1',
        details: createPaymentDetails(paymentMethod),
      },
      {
        title: 'تایید واریز وجه',
        timestamp: '16:05 - 1404/2/13',
      },
    ],
  };

  const mergedData = { ...defaultData, ...data };

  return (
    <BaseAccordionContent
      headerItems={[{ title: 'شماره تراکنش', value: mergedData.orderNumber }]}
      data={mergedData}
    />
  );
};

// Withdraw Component
export const AccordionContentWithdraw: React.FC<{
  data?: Partial<AccordionContentData>;
  status?: TransactionStatus;
  requestMethod?: RequestMethod;
}> = ({ data, status = 'completed', requestMethod = 'توسط مشتری' }) => {
  const isCompleted = status === 'completed';

  const defaultData: AccordionContentData = {
    orderNumber: '1316543',
    progressItems: createProgressItems(['success', 'success'], [160, 16]),
    activeIndex: isCompleted ? 1 : 0,
    steps: [
      {
        title: 'برداشت وجه',
        timestamp: '1404/2/1',
        details: [
          { label: 'روش پرداخت', value: requestMethod },
          { label: 'نام بانک', value: 'بانک سامان' },
          { label: 'نوع درخواست', value: 'توسط مشتری' },
          { label: 'مبلغ', value: 45000000, unit: 'ریال' },
        ],
      },
      {
        title: 'تایید برداشت وجه',
        timestamp: isCompleted ? '16:05 - 1404/2/13' : undefined,
      },
    ],
  };

  const mergedData = { ...defaultData, ...data };

  return (
    <BaseAccordionContent
      headerItems={[{ title: 'شماره تراکنش', value: mergedData.orderNumber }]}
      data={mergedData}
    />
  );
};

import { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { BottomSheet } from './BottomSheet';
import { Button } from '../Button';

const meta: Meta<typeof BottomSheet> = {
  component: BottomSheet,
  title: 'Components/BottomSheet',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A bottom sheet component built on react-spring-bottom-sheet that slides up from the bottom of the screen.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the bottom sheet is displayed',
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Function called when the bottom sheet should close',
    },
    header: {
      control: 'text',
      description: 'React node rendered as the header of the bottom sheet',
    },
    body: {
      control: 'text',
      description:
        'React node rendered as the body/content of the bottom sheet',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the bottom sheet',
    },
    blocking: {
      control: 'boolean',
      description:
        'Whether the bottom sheet should block page scrolling when open',
    },
    expandOnContentDrag: {
      control: 'boolean',
      description: 'Whether the bottom sheet should be expandable',
    },
    maxHeight: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.05 },
      description:
        'Maximum height of the bottom sheet as a percentage of viewport height',
    },
    defaultSnap: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.05 },
      description:
        'Default height of the bottom sheet as a percentage of viewport height',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show a close button in the header',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">BottomSheet Demo</h1>
          <p className="text-gray-600">
            Click the button below to open the bottom sheet.
          </p>
          <Button mode="primary" size="md" onClick={() => setIsOpen(true)}>
            Open Bottom Sheet
          </Button>
        </div>

        <BottomSheet
          className="p-6"
          open={isOpen}
          onDismiss={() => setIsOpen(false)}
          header={'عنوان'}
          body={
            <div className="space-y-4">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </div>
          }
        />
      </div>
    );
  },
};

export const FilterExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Filter BottomSheet Example</h1>
          <p className="text-gray-600">
            This example shows a filter interface like the one in your
            screenshot.
          </p>
          <Button mode="primary" size="md" onClick={() => setIsOpen(true)}>
            Open Filter Sheet
          </Button>
        </div>

        <BottomSheet
          className="p-6"
          open={isOpen}
          onDismiss={() => setIsOpen(false)}
          header="فیلترها"
          body={
            <div className="space-y-6">
              {/* Filter Options */}
              <div className="space-y-4">
                {/* Performance Report Type */}
                <div className="border-borderneutral-secondary flex items-center justify-between border-b py-4">
                  <span className="texttext-neutral-primary text-base">
                    نوع گزارش عملکرد
                  </span>{' '}
                  <svg
                    className="texttext-neutral-primary h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                {/* Accounting Report Type */}
                <div className="flex items-center justify-between border-b border-gray-200 py-4">
                  <span className="texttext-neutral-primary text-base">
                    نوع گزارش حسابداری
                  </span>
                  <svg
                    className="texttext-neutral-primary h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                {/* Time Filter */}
                <div className="flex items-center justify-between border-b border-gray-200 py-4">
                  <span className="texttext-neutral-primary text-base">
                    فیلتر زمانی
                  </span>
                  <svg
                    className="texttext-neutral-primary h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  mode="secondary"
                  size="md"
                  className="flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  حذف فیلتر
                </Button>
                <Button
                  theme="brand"
                  mode="primary"
                  size="md"
                  className="flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  اعمال فیلتر
                </Button>
              </div>
            </div>
          }
        />
      </div>
    );
  },
};

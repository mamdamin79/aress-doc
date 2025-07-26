import { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Dialog } from './Dialog';
import { TextField } from '../TextField/TextField';
import { Button } from '../Button';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'Components/Dialog',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the dialog is displayed',
    },
    onClose: {
      action: 'closed',
      description: 'Function called when the dialog should close',
    },
    className: {
      control: 'text',
      description: 'Additional tailwind classes to apply to the dialog panel',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button
          align="center"
          isLoading={false}
          mode="primary"
          size="md"
          onClick={() => setIsOpen(true)}
        >
          Open Dialog
        </Button>
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex w-[500px] flex-col items-center gap-4 text-4xl">
            <div>تیتر</div>
            <div className="text-xl">توضیحات</div>
            <div className="text-right text-lg" dir="rtl">
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
          </div>
        </Dialog>
      </>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      setIsOpen(false);
    };

    const handleChange = (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
      <>
        <Button
          align="center"
          isLoading={false}
          mode="primary"
          size="md"
          onClick={() => setIsOpen(true)}
        >
          Open Dialog
        </Button>
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="w-[400px]" dir="rtl">
            <h2 className="mb-4 text-center text-2xl font-bold">فرم تستی</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <TextField
                  id="firstName"
                  mergeTitleAndPlaceholder
                  mode="outline"
                  trailingIcons={[]}
                  placeholder="نام"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  aria-label="نام"
                />
              </div>
              <div>
                <TextField
                  id="lastName"
                  mergeTitleAndPlaceholder
                  mode="outline"
                  trailingIcons={[]}
                  placeholder="نام خانوادگی"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  aria-label="نام خانوادگی"
                />
              </div>
              <div className="flex justify-end space-x-2 space-x-reverse">
                <Button
                  isLoading={false}
                  type="button"
                  align="center"
                  mode="secondary"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  انصراف
                </Button>
                <Button
                  type="submit"
                  align="center"
                  isLoading={false}
                  mode="primary"
                  size="sm"
                >
                  ثبت
                </Button>
              </div>
            </form>
          </div>
        </Dialog>
      </>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button
          align="center"
          isLoading={false}
          mode="primary"
          size="md"
          onClick={() => setIsOpen(true)}
        >
          Open Dialog
        </Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="border-blue-500 bg-gray-900 text-white"
        >
          <div className="w-[300px] text-center">
            <h2 className="mb-4 text-2xl font-bold">Custom Styling</h2>
            <p className="mb-4">
              This dialog has custom background and text colors.
            </p>
            <Button
              align="center"
              isLoading={false}
              mode="primary"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </Dialog>
      </>
    );
  },
};

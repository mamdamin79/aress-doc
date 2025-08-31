import { Meta, StoryObj } from '@storybook/nextjs';
import { LogoutModal } from './LogoutModal';
import { useState } from 'react';
import { Button } from '../Button';

const meta: Meta<typeof LogoutModal> = {
  title: 'Components/LogoutModal',
  component: LogoutModal,
};

export default meta;

type Story = StoryObj<typeof LogoutModal>;

export const Default: Story = {
  render: (args) => {
    const LogoutModalWrapper = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button
            theme="brand"
            align="center"
            mode="primary"
            size="md"
            isLoading={false}
            onClick={() => setIsOpen(!isOpen)}
          >
            باز کردن مدال خروج
          </Button>
          <LogoutModal
            {...args}
            onClose={() => setIsOpen(false)}
            title="خروج"
            isOpen={isOpen}
            titleAlign="center"
            onLogout={() => {
              setIsOpen(false);
              alert('عملیات خروج صورت گرفت !');
            }}
            subtitle="آیا مطمئن هستید که می‌خواهید از این نشست خارج شوید؟"
          />
        </>
      );
    };

    return <LogoutModalWrapper />;
  },
};

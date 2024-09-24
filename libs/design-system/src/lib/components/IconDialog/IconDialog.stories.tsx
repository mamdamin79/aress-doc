import { Meta, StoryObj } from '@storybook/react/*';
import { IconDialog } from './IconDialog';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof IconDialog> = {
  title: 'component/iconDialog',
  component: IconDialog,
};

export default meta;

type story = StoryObj<typeof IconDialog>;

export const Success: story = {
  args: {
    title: 'دیدگاه ثبت شد!',
    message: 'دیدگاه شما پس از بررسی منتشر خواهد شد.',
    isOpen: true,
    mode: 'success',
  },
  render: function Success(args) {
    const [{ isOpen }, updateArgs] = useArgs();

    function onChange() {
      updateArgs({ isOpen: !isOpen });
    }

    return <IconDialog {...args} onClose={onChange} isOpen={isOpen} />;
  },
};

export const Error: story = {
  args: {
    title: 'دیدگاه ثبت نشد!',
    message: 'دیدگاه شما پس از بررسی منتشر خواهد شد.',
    isOpen: true,
    mode: 'error',
  },
  render: function Success(args) {
    const [{ isOpen }, updateArgs] = useArgs();

    function onChange() {
      updateArgs({ isOpen: !isOpen });
    }

    return <IconDialog {...args} onClose={onChange} isOpen={isOpen} />;
  },
};

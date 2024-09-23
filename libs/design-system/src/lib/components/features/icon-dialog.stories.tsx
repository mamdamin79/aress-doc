import { Meta, StoryObj } from '@storybook/react/*';
import { IconDialog } from './icon-dialog';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof IconDialog> = {
  title: 'component/iconDialog',
  component: IconDialog,
};

export default meta;

type story = StoryObj<typeof IconDialog>;

export const success: story = {
  args: {
    title: 'دیدگاه ثبت شد!',
    message: 'دیدگاه شما پس از بررسی منتشر خواهد شد.',
    isOpen: true,
    mode: 'success',
  },
  render: function Render(args) {
    const [{ isOpen }, updateArgs] = useArgs();

    function onChange() {
      updateArgs({ isOpen: !isOpen });
    }

    return <IconDialog {...args} onClose={onChange} isOpen={isOpen} />;
  },
};

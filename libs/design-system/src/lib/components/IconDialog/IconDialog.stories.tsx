import { Meta, StoryObj } from '@storybook/react/*';
import { IconDialog } from './IconDialog';
import { useArgs } from '@storybook/preview-api';

// Meta configuration for the IconDialog component in Storybook
const meta: Meta<typeof IconDialog> = {
  title: 'Component/IconDialog', //Definde title component in storybook UI
  component: IconDialog, //link actual component
};

export default meta;

type story = StoryObj<typeof IconDialog>;

// story for success mode
export const Success: story = {
  args: {
    title: 'دیدگاه ثبت شد!',
    message: 'دیدگاه شما پس از بررسی منتشر خواهد شد.',
    isOpen: true,
    mode: 'success',
  },
  render: function Success(args) {
    const [{ isOpen }, updateArgs] = useArgs();

    // change boolean state for show dialog
    function onChange() {
      updateArgs({ isOpen: !isOpen });
    }

    return <IconDialog {...args} onClose={onChange} isOpen={isOpen} />;
  },
};

// story for error mode
export const Error: story = {
  args: {
    title: 'دیدگاه ثبت نشد!',
    message: 'دیدگاه شما پس از بررسی منتشر خواهد شد.',
    isOpen: true,
    mode: 'error',
  },
  render: function Success(args) {
    const [{ isOpen }, updateArgs] = useArgs();

    // change boolean state for show dialog
    function onChange() {
      updateArgs({ isOpen: !isOpen });
    }

    return <IconDialog {...args} onClose={onChange} isOpen={isOpen} />;
  },
};

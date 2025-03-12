import { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { useState } from 'react';
const meta: Meta<typeof Dialog> = {
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)}>open</button>
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex w-[500px] flex-col items-center gap-4 text-4xl">
            <div>title</div>
            <div className="text-xl">subtitle</div>
            <div className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut et
              illo rem hic doloribus praesentium at blanditiis expedita
              cupiditate velit officiis quaerat molestiae, quasi eaque quia
              exercitationem libero? Alias, quae.
            </div>
          </div>
        </Dialog>
      </>
    );
  },

  args: {},
};

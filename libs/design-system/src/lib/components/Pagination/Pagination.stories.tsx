import { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    pageCount: { control: { type: 'number', min: 1 } },
    onPageChange: { action: 'page changed' },
  },
  args: {
    pageCount: 10,
    pageSize: 5,
    currentPage: 5,
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => {
    const PaginationWrapper = () => {
      const [currentPage, setCurrentPage] = useState(args.currentPage);

      const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
        args.onPageChange(selectedItem); 
      };

      return (
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      );
    };

    return <PaginationWrapper />;
  },
};


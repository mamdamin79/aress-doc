import type { Meta, StoryObj } from '@storybook/nextjs';
import { FilterPopUpSection } from './FilterPopUpSection';

const meta: Meta<typeof FilterPopUpSection> = {
  title: 'Components/FilterPopUpSection',
  component: FilterPopUpSection,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FilterPopUpSection>;

export const Default: Story = {
  args: {
    filterOptions: [
      {
        title: 'بازه زمانی',
        options: ['روزانه', 'ماهانه', 'سالانه'],
        singleSelect: false,
      },
    ],
    searchValue: '',
    selectedFilters: {},
    onSearchChange: (value) => console.log('Search:', value),
    onFilterChange: (filters) => console.log('Filters:', filters),
  },
};

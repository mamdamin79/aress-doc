import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { SelectionChips } from './SelectionChips';
import { ChipItem } from './SelectionChips.types';

const meta: Meta<typeof SelectionChips> = {
  title: 'Components/SelectionChips',
  component: SelectionChips,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['input', 'filter'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectionChips>;

const sampleItems: ChipItem[] = [
  { id: '1', label: 'فروش', removable: true },
  { id: '2', label: 'فروش', removable: true },
  { id: '3', label: 'فروش', removable: true },
];

const filterItems: ChipItem[] = [
  { id: '1', label: 'فروش' },
  { id: '2', label: 'فروش' },
  { id: '3', label: 'فروش' },
];

// Input Chip Stories
export const InputChipDefault: Story = {
  args: {
    variant: 'input',
    items: sampleItems,
  },
};

export const InputChipDisabled: Story = {
  args: {
    variant: 'input',
    items: sampleItems,
    disabled: true,
  },
};

// Filter Chip Stories
export const FilterChipDefault: Story = {
  args: {
    variant: 'filter',
    items: filterItems,
  },
};

export const FilterChipSelectedWithCheck: Story = {
  args: {
    variant: 'filter',
    items: filterItems,
    selectedItems: ['1', '3'],
    showChecked: true,
  },
};
export const FilterChipSelectedWithoutCheck: Story = {
  args: {
    variant: 'filter',
    items: filterItems,
    selectedItems: ['1', '3'],
  },
};
export const FilterChipDisabled: Story = {
  args: {
    variant: 'filter',
    items: filterItems,
    disabled: true,
  },
};

export const FilterChipSelectedDisabled: Story = {
  args: {
    variant: 'filter',
    items: filterItems,
    selectedItems: ['1', '3'],
    disabled: true,
  },
};

// Interactive Examples
export const InteractiveInputChips: Story = {
  render: () => {
    const [items, setItems] = useState<ChipItem[]>([
      { id: '1', label: 'فروش', removable: true },
      { id: '2', label: 'فروش', removable: true },
      { id: '3', label: 'فروش', removable: true },
    ]);

    const handleRemove = (itemId: string) => {
      setItems(items.filter((item) => item.id !== itemId));
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Input Chips</h3>
        <p className="text-sm text-gray-600">
          Click the X button to remove chips
        </p>
        <SelectionChips
          variant="input"
          items={items}
          onItemRemove={handleRemove}
        />
      </div>
    );
  },
};

export const InteractiveFilterChips: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>(['1']);
    const [showTick, setShowTick] = useState(false);

    const handleItemClick = (itemId: string) => {
      setSelectedItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId],
      );
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Filter Chips</h3>
        <p className="text-sm text-gray-600">Click chips to toggle selection</p>
        <SelectionChips
          variant="filter"
          showChecked={showTick}
          items={filterItems}
          selectedItems={selectedItems}
          onItemClick={handleItemClick}
        />
        <div className="text-sm text-gray-500">
          Selected: {selectedItems.join(', ') || 'None'}
        </div>
        <div
          className="bg-surface-neutral-secondary text-text-neutral-secondarycontrast hover:bg-surface-brand-200 active:bg-surface-brand-500 active:text-text-neutral-white flex cursor-pointer items-center justify-center rounded-xl px-3 py-1 transition-colors"
          onClick={() => setShowTick((prev) => !prev)}
        >
          toggle check mark
        </div>
      </div>
    );
  },
};

// All States Showcase
export const AllStatesShowcase: Story = {
  render: () => {
    return (
      <div className="space-y-8 p-4">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Input Chips</h3>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium">Default</h4>
              <SelectionChips variant="input" items={sampleItems} />
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Disabled</h4>
              <SelectionChips variant="input" items={sampleItems} disabled />
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Filter Chips</h3>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium">Default</h4>
              <SelectionChips variant="filter" items={filterItems} />
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Selected</h4>
              <SelectionChips
                variant="filter"
                items={filterItems}
                selectedItems={['1', '3']}
              />
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Disabled</h4>
              <SelectionChips variant="filter" items={filterItems} disabled />
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Selected + Disabled</h4>
              <SelectionChips
                variant="filter"
                items={filterItems}
                selectedItems={['1', '3']}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

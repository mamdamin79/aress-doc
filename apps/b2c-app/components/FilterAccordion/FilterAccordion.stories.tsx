import { Meta, StoryObj } from '@storybook/nextjs';
import { FilterAccordion, FilterSection } from './FilterAccordion';
import { useState } from 'react';
import { Accordion } from 'design-system';

const meta: Meta<typeof FilterAccordion> = {
  title: 'Components/FilterAccordionItems',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A reusable accordion item component for filtering options. Supports both checkbox and radio button modes, with special handling for time filters including custom date range selection.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FilterAccordion>;

// Mock data for different filter types
const mockStatusOptions = [
  { id: 'active', label: 'فعال', value: 'active' },
  { id: 'inactive', label: 'غیرفعال', value: 'inactive' },
  { id: 'pending', label: 'در انتظار', value: 'pending' },
];

const mockCategoryOptions = [
  { id: 'tech', label: 'فناوری', value: 'technology' },
  { id: 'finance', label: 'مالی', value: 'finance' },
  { id: 'health', label: 'سلامت', value: 'health' },
  { id: 'education', label: 'آموزش', value: 'education' },
];

const mockTimeOptions = [
  { id: 'today', label: 'امروز', value: 'today' },
  { id: 'week', label: 'هفته گذشته', value: 'last-week' },
  { id: 'month', label: 'ماه گذشته', value: 'last-month' },
  { id: 'custom', label: 'بازه دلخواه', value: 'custom-range' },
];

export const StatusFilter: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['active']);

    const handleValueChange = (value: string) => {
      setSelectedValues((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
      );
    };

    const statusSection: FilterSection = {
      id: 'status-filters',
      title: 'وضعیت',
      options: mockStatusOptions,
      selectedValues,
      onValueChange: handleValueChange,
    };

    const accordionItem = FilterAccordion(statusSection);

    return (
      <div className="w-80 rounded-lg border">
        <Accordion
          items={[accordionItem]}
          defaultOpenItems={[0]}
          singleOpen={false}
          allowMultiple={true}
        />
      </div>
    );
  },
};

export const CategoryFilter: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([
      'technology',
      'finance',
    ]);

    const handleValueChange = (value: string) => {
      setSelectedValues((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
      );
    };

    const categorySection: FilterSection = {
      id: 'category-filters',
      title: 'دسته‌بندی',
      options: mockCategoryOptions,
      selectedValues,
      onValueChange: handleValueChange,
    };

    const accordionItem = FilterAccordion(categorySection);

    return (
      <div className="w-80 rounded-lg border">
        <Accordion
          items={[accordionItem]}
          defaultOpenItems={[0]}
          singleOpen={false}
          allowMultiple={true}
        />
      </div>
    );
  },
};

export const TimeFilter: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([
      'last-week',
    ]);

    const handleValueChange = (value: string) => {
      // For time filters, only one option should be selected (radio behavior)
      setSelectedValues([value]);
    };

    const timeSection: FilterSection = {
      id: 'time-filters',
      title: 'بازه زمانی',
      options: mockTimeOptions,
      selectedValues,
      onValueChange: handleValueChange,
    };

    const accordionItem = FilterAccordion(timeSection);

    return (
      <div className="w-80 rounded-lg border">
        <Accordion
          items={[accordionItem]}
          defaultOpenItems={[0]}
          singleOpen={false}
          allowMultiple={true}
        />
      </div>
    );
  },
};

export const TimeFilterWithCustomRange: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([
      'custom-range',
    ]);

    const handleValueChange = (value: string) => {
      setSelectedValues([value]);
    };

    const timeSection: FilterSection = {
      id: 'time-filters',
      title: 'بازه زمانی',
      options: mockTimeOptions,
      selectedValues,
      onValueChange: handleValueChange,
    };

    const accordionItem = FilterAccordion(timeSection);

    return (
      <div className="w-80 rounded-lg border">
        <Accordion
          items={[accordionItem]}
          defaultOpenItems={[0]}
          singleOpen={false}
          allowMultiple={true}
        />
      </div>
    );
  },
};

export const MultipleFilters: Story = {
  render: () => {
    const [statusValues, setStatusValues] = useState<string[]>(['active']);
    const [categoryValues, setCategoryValues] = useState<string[]>([
      'technology',
    ]);
    const [timeValues, setTimeValues] = useState<string[]>(['last-month']);

    const handleStatusChange = (value: string) => {
      setStatusValues((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
      );
    };

    const handleCategoryChange = (value: string) => {
      setCategoryValues((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
      );
    };

    const handleTimeChange = (value: string) => {
      setTimeValues([value]);
    };

    const sections: FilterSection[] = [
      {
        id: 'status-filters',
        title: 'وضعیت',
        options: mockStatusOptions,
        selectedValues: statusValues,
        onValueChange: handleStatusChange,
      },
      {
        id: 'category-filters',
        title: 'دسته‌بندی',
        options: mockCategoryOptions,
        selectedValues: categoryValues,
        onValueChange: handleCategoryChange,
      },
      {
        id: 'time-filters',
        title: 'بازه زمانی',
        options: mockTimeOptions,
        selectedValues: timeValues,
        onValueChange: handleTimeChange,
      },
    ];

    const accordionItems = sections.map((section) => FilterAccordion(section));

    return (
      <div className="w-80 rounded-lg border">
        <Accordion
          items={accordionItems}
          defaultOpenItems={[0, 1, 2]}
          singleOpen={false}
          allowMultiple={true}
        />
      </div>
    );
  },
};

export const EmptyFilter: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleValueChange = (value: string) => {
      setSelectedValues((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
      );
    };

    const emptySection: FilterSection = {
      id: 'empty-filters',
      title: 'بدون انتخاب',
      options: mockStatusOptions,
      selectedValues,
      onValueChange: handleValueChange,
    };

    const accordionItem = FilterAccordion(emptySection);

    return (
      <div className="w-80 rounded-lg border">
        <Accordion
          items={[accordionItem]}
          defaultOpenItems={[0]}
          singleOpen={false}
          allowMultiple={true}
        />
      </div>
    );
  },
};

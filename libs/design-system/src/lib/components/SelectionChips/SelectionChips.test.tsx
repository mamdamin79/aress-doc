import { render, screen, fireEvent } from '@testing-library/react';
import { SelectionChips } from './SelectionChips';
import { ChipItem } from './SelectionChips.types';

const mockItems: ChipItem[] = [
  { id: '1', label: 'Test Item 1', removable: true },
  { id: '2', label: 'Test Item 2', removable: true },
  { id: '3', label: 'Test Item 3' },
];

describe('SelectionChips', () => {
  describe('Input Chip Variant', () => {
    it('renders input chips correctly', () => {
      render(<SelectionChips variant="input" items={mockItems} />);

      expect(screen.getByText('Test Item 1')).toBeInTheDocument();
      expect(screen.getByText('Test Item 2')).toBeInTheDocument();
      expect(screen.getByText('Test Item 3')).toBeInTheDocument();
    });

    it('calls onItemRemove when remove button is clicked', () => {
      const mockOnRemove = jest.fn();
      render(
        <SelectionChips
          variant="input"
          items={mockItems}
          onItemRemove={mockOnRemove}
        />,
      );

      const removeButtons = screen.getAllByRole('button');
      fireEvent.click(removeButtons[0]);

      expect(mockOnRemove).toHaveBeenCalledWith('1');
    });

    it('does not show remove button for non-removable items', () => {
      render(
        <SelectionChips
          variant="input"
          items={[{ id: '1', label: 'Non-removable', removable: false }]}
        />,
      );

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('Filter Chip Variant', () => {
    it('renders filter chips correctly', () => {
      render(<SelectionChips variant="filter" items={mockItems} />);

      expect(screen.getByText('Test Item 1')).toBeInTheDocument();
      expect(screen.getByText('Test Item 2')).toBeInTheDocument();
      expect(screen.getByText('Test Item 3')).toBeInTheDocument();
    });

    it('shows selected state correctly', () => {
      render(
        <SelectionChips
          variant="filter"
          items={mockItems}
          selectedItems={['1', '3']}
        />,
      );

      // Check if check icons are present for selected items
      const checkIcons = screen.getAllByTestId('check-icon');
      expect(checkIcons).toHaveLength(2);
    });

    it('calls onItemClick when chip is clicked', () => {
      const mockOnClick = jest.fn();
      render(
        <SelectionChips
          variant="filter"
          items={mockItems}
          onItemClick={mockOnClick}
        />,
      );

      fireEvent.click(screen.getByText('Test Item 1'));

      expect(mockOnClick).toHaveBeenCalledWith('1');
    });
  });

  describe('Disabled State', () => {
    it('does not call handlers when disabled', () => {
      const mockOnClick = jest.fn();
      const mockOnRemove = jest.fn();

      render(
        <SelectionChips
          variant="input"
          items={mockItems}
          onItemClick={mockOnClick}
          onItemRemove={mockOnRemove}
          disabled
        />,
      );

      fireEvent.click(screen.getByText('Test Item 1'));

      expect(mockOnClick).not.toHaveBeenCalled();
      expect(mockOnRemove).not.toHaveBeenCalled();
    });
  });
});

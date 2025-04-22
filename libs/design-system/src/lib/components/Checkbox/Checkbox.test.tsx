import { fireEvent, render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import '@testing-library/jest-dom';

describe('Checkbox Component', () => {
  test('should not be clickable when disabled', () => {
    const mockOnChange = jest.fn();

    render(
      <Checkbox disabled={true} onChange={mockOnChange} content="Test Checkbox" />,
    );

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Test Checkbox');

    expect(checkbox).toHaveAttribute('aria-checked', 'false');
    expect(label).toHaveClass('text-gray-400');

    // کلیک باید بی‌اثر باشه
    fireEvent.click(checkbox);
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  test('should change aria-checked to true when clicked and enabled', () => {
    const mockOnChange = jest.fn();

    render(<Checkbox onChange={mockOnChange} content="Test Checkbox" />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import { Checkbox } from './Checkbox';
import '@testing-library/jest-dom';

describe('Checkbox Component', () => {
  const noop = () => {
    return null;
  };

  test('should not be clickable when disabled', () => {
    render(
      <Checkbox disabled={true} onChange={noop} content="Test Checkbox" />,
    );

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Test Checkbox');

    expect(checkbox).toHaveAttribute('aria-checked', 'false');

    expect(label).toHaveClass('text-gray-400');
  });

  test('should change aria-checked to true when clicked and enabled', () => {
    render(<Checkbox onChange={noop} content="Test Checkbox" />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(checkbox);

    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });
});

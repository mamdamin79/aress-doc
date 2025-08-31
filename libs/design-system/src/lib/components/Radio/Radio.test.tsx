import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders with content', () => {
    render(<Radio content="Test Radio" checked={false} onChange={() => {}} />);

    expect(screen.getByText('Test Radio')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(
      <Radio content="Test Radio" checked={false} onChange={handleChange} />,
    );

    fireEvent.click(screen.getByText('Test Radio'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('shows checked state', () => {
    render(<Radio content="Test Radio" checked={true} onChange={() => {}} />);

    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
  });

  it('handles disabled state', () => {
    const handleChange = jest.fn();
    render(
      <Radio
        content="Test Radio"
        checked={false}
        disabled={true}
        onChange={handleChange}
      />,
    );

    fireEvent.click(screen.getByText('Test Radio'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders with reactcontent', () => {
    render(
      <Radio
        reactcontent={<span>React Content</span>}
        checked={false}
        onChange={() => {}}
      />,
    );

    expect(screen.getByText('React Content')).toBeInTheDocument();
  });
});

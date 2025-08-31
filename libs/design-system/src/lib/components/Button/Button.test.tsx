import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';
import '@testing-library/jest-dom';

describe('Button component', () => {
  const handleClick = jest.fn();

  test('renders disabled button, no click or hover effect', () => {
    render(
      <Button
        theme="brand"
        mode="primary"
        size="md"
        align="center"
        isLoading={false}
        disabled={true}
        onClick={handleClick}
      >
        Click me
      </Button>,
    );

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeDisabled();

    const initialStyle = buttonElement.className;

    fireEvent.click(buttonElement);

    expect(buttonElement.className).toBe(initialStyle);

    fireEvent.mouseOver(buttonElement);

    expect(buttonElement.className).toBe(initialStyle);
  });

  test('renders loading spinner when isLoading is true, no click or hover effect', () => {
    const { container } = render(
      <Button
        theme="brand"
        mode="primary"
        size="md"
        align="center"
        isLoading={true}
        disabled={false}
        onClick={handleClick}
      >
        Click me
      </Button>,
    );

    const buttonElement = screen.getByRole('button');

    const spinnerElements = container.querySelectorAll('.animate-spin');
    expect(spinnerElements.length).toBeGreaterThan(0);

    const initialStyle = buttonElement.className;

    fireEvent.click(buttonElement);

    expect(buttonElement.className).toBe(initialStyle);

    fireEvent.mouseOver(buttonElement);

    expect(buttonElement.className).toBe(initialStyle);
  });

  test('renders button with correct size classes', () => {
    const { container: mdContainer } = render(
      <Button
        theme="brand"
        mode="primary"
        size="md"
        align="center"
        isLoading={false}
        disabled={false}
      >
        Click me
      </Button>,
    );

    const mdButtonElement = mdContainer.querySelector('button');
    expect(mdButtonElement).toHaveClass('h-12');

    const { container: smContainer } = render(
      <Button
        mode="primary"
        size="sm"
        align="center"
        isLoading={false}
        disabled={false}
      >
        Click me
      </Button>,
    );

    const smButtonElement = smContainer.querySelector('button');
    expect(smButtonElement).toHaveClass('h-[38px]');
  });

  test('renders button with correct alignment class', () => {
    const { container: centerContainer } = render(
      <Button
        mode="primary"
        size="md"
        align="center"
        isLoading={false}
        disabled={false}
      >
        Click me
      </Button>,
    );

    const centerText = centerContainer.querySelectorAll('.text-center');
    expect(centerText.length).toBeGreaterThan(0);

    const { container: rightContainer } = render(
      <Button
        theme="brand"
        mode="primary"
        size="md"
        align="right"
        isLoading={false}
        disabled={false}
      >
        Click me
      </Button>,
    );

    const rightText = rightContainer.querySelectorAll('.text-right');
    expect(rightText.length).toBeGreaterThan(0);
  });

  test('calls onClick handler when button is clicked', () => {
    const handleClick = jest.fn();

    render(
      <Button
        theme="brand"
        mode="primary"
        size="md"
        align="center"
        isLoading={false}
        disabled={false}
        onClick={handleClick}
      >
        Click me
      </Button>,
    );

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';
import { describe } from 'node:test';
import '@testing-library/jest-dom';
import { ButtonMode } from './Button.types';

describe('Button component', () => {
  const handleClick = jest.fn();

  test('renders disabled button, no click or hover effect', () => {
    render(
      <Button
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
    const handleClick = jest.fn();

    const { container } = render(
      <Button
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

  test.each<[ButtonMode, string]>([
    ['primary', 'bg-brand-600 active:bg-brand-800'],
    ['secondary', 'active:bg-brand-800'],
    ['text', 'active:text-brand-800 active:border-brand-800'],
    ['underline', 'active:text-brand-800 active:border-brand-800'],
  ])('checks active state style for %s button', (mode, expectedClass) => {
    render(
      <Button
        mode={mode}
        size="md"
        align="center"
        isLoading={false}
        disabled={false}
      >
        Click me
      </Button>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toHaveClass(expectedClass);
  });

  test.each<[ButtonMode, string]>([
    ['primary', 'hover:bg-brand-700'],
    ['secondary', 'hover:bg-brand-700 hover:text-white'],
    ['text', 'hover:border-brand-600'],
  ])('checks hover state style for %s button', (mode, expectedClass) => {
    render(
      <Button
        mode={mode}
        size="md"
        align="center"
        isLoading={false}
        disabled={false}
      >
        Click me
      </Button>,
    );

    const button = screen.getByRole('button');
    fireEvent.mouseOver(button);
    expect(button).toHaveClass(expectedClass);
  });

  test.each<[ButtonMode, string]>([
    ['primary', 'bg-brand-600'],
    ['secondary', 'border-brand-600 text-brand-600'],
    ['text', 'text-brand-600'],
    ['underline', 'text-brand-600'],
  ])('checks loading state for %s button', (mode, expectedClass) => {
    const { container } = render(
      <Button
        mode={mode}
        size="md"
        align="center"
        isLoading={true}
        disabled={false}
      >
        Click me
      </Button>,
    );

    const spinnerElements = container.querySelectorAll('.animate-spin');
    expect(spinnerElements.length).toBeGreaterThan(0);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(expectedClass);
  });

  test.each<[ButtonMode, string, string]>([
    ['primary', 'bg-brand-600 text-white', 'h-12 rounded-lg'],
    ['secondary', 'border-brand-600 bg-white', 'h-12 rounded-lg'],
    ['text', 'text-brand-600', 'h-12 rounded-lg'],
    ['underline', 'text-brand-600', 'h-12 rounded-lg'],
  ])(
    'checks correct styles for %s mode',
    (mode, expectedClass, expectedSizeClass) => {
      render(
        <Button
          mode={mode}
          size="md"
          align="center"
          isLoading={false}
          disabled={false}
        >
          Click me
        </Button>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass(expectedClass);
      expect(button).toHaveClass(expectedSizeClass);
    },
  );
});

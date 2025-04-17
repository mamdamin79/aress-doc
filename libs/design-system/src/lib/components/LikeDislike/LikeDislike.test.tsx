import { afterEach } from 'vitest';
import { cleanup, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { LikeDislike } from './LikeDislike';

afterEach(() => {
  cleanup();
});
const fakeFunction = vi.fn();
describe('LikeDislike', () => {
  it('renders the component with initial values', () => {
    const { getByText } = render(
      <LikeDislike
        initialValue={10}
        reaction="like"
        reactedBefore={false}
        onReact={fakeFunction}
      />,
    );
    expect(getByText('10')).toBeInTheDocument();
  });

  it('increments value when clicked if its not already clicked.', () => {
    const { getByText, getByRole } = render(
      <LikeDislike
        initialValue={10}
        reaction="like"
        reactedBefore={false}
        onReact={fakeFunction}
      />,
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(getByText('11')).toBeInTheDocument();
    expect(fakeFunction).toHaveBeenCalledWith('like');
  });

  it('decrements value when clicked if already is was clicked', () => {
    const { getByText, getByRole } = render(
      <LikeDislike
        initialValue={10}
        reaction="like"
        reactedBefore={true}
        onReact={fakeFunction}
      />,
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(getByText('9')).toBeInTheDocument();
    expect(fakeFunction).toHaveBeenCalledWith('like');
  });
});

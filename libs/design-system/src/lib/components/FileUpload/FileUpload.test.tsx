import { afterEach } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { FileUpload } from './FileUpload';

afterEach(() => {
  cleanup();
});

const fakeOnErr = vi.fn();
const fakeOnChange = vi.fn();

describe('FileUpload', () => {
  it('renders the component with initial values', () => {
    const { getByText } = render(
      <FileUpload maxSize={3000} types={['xls', 'xlsx']} onError={fakeOnErr} />,
    );
    expect(
      getByText('انتخاب فایل اکسل (.xls یا .xlsx) تا حداکثر حجم ۲ مگابایت'),
    ).toBeInTheDocument();
  });

  it('calls onChange with the selected file when valid file is uploaded', () => {
    const { container } = render(
      <FileUpload
        maxSize={3000}
        types={['xls', 'xlsx']}
        onError={fakeOnErr}
        onChange={fakeOnChange}
      />,
    );

    const fileInput = container.querySelector('input[type="file"]');
    const validFile = new File(['dummy content'], 'file.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    fireEvent.change(fileInput!, { target: { files: [validFile] } });

    expect(fakeOnChange).toHaveBeenCalledWith(validFile);
  });

  it('renders file name  after a valid file is uploaded', () => {
    const { container, getByText } = render(
      <FileUpload maxSize={3000} types={['xls', 'xlsx']} onError={fakeOnErr} />,
    );

    const fileInput = container.querySelector('input[type="file"]');
    const validFile = new File(['dummy content'], 'file.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    fireEvent.change(fileInput!, { target: { files: [validFile] } });

    expect(getByText('file.xlsx')).toBeInTheDocument();
  });

  it('clears file when the delete button is clicked', () => {
    const { container, getByText } = render(
      <FileUpload
        maxSize={3000}
        types={['xls', 'xlsx']}
        onError={fakeOnErr}
        onChange={fakeOnChange}
      />,
    );

    const fileInput = container.querySelector('input[type="file"]');
    const validFile = new File(['dummy content'], 'file.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    fireEvent.change(fileInput!, { target: { files: [validFile] } });

    // Simulate clicking the trash icon
    const deleteButton = container.querySelector('button');
    fireEvent.click(deleteButton!);

    expect(
      getByText('انتخاب فایل اکسل (.xls یا .xlsx) تا حداکثر حجم ۲ مگابایت'),
    ).toBeInTheDocument();
  });
  it('gives invalid file size err if file is too large', () => {
    const { container } = render(
      <FileUpload maxSize={0} types={['xls', 'xlsx']} onError={fakeOnErr} />,
    );

    const fileInput = container.querySelector('input[type="file"]');
    const validFile = new File(['dummy content'], 'file.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    fireEvent.change(fileInput!, { target: { files: [validFile] } });
    expect(fakeOnErr).toHaveBeenCalledWith('FILE_TOO_LARGE');
  });
});

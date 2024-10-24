import React, { useState } from 'react';
import { Icon } from '../Icon';
import { FileUploader } from 'react-drag-drop-files';
type FileUploadProps = {
  types: string[];
};

export const FileUpload: React.FC<FileUploadProps> = ({ types }) => {
  const [file, setFile] = useState<File | null>(null);
  const getFileSize = (file: File) => {
    const sizeInBytes = file.size;
    const sizeInKB = sizeInBytes / 1024;
    const sizeInMB = sizeInKB / 1024;

    return sizeInKB < 1
      ? `${sizeInBytes} bytes`
      : sizeInKB < 1024
      ? `${sizeInKB.toFixed(2)} KB`
      : `${sizeInMB.toFixed(2)} MB`;
  };
  const handleChange = (file: File) => {
    setFile(file);
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
  };

  return (
    <>
      {file && (
        <div onClick={clearFile} className="cursor-pointer z-10 ml-[-40px]">
          <Icon name="trash-2" key="trash-2" size="lg" />
        </div>
      )}

      <FileUploader
        handleChange={handleChange}
        name="file"
        types={types}
        children={
          <div
            className={`border-2 rounded-md p-[15px_16px_15px_16px] flex items-center gap-2 relative w-max hover:border-brand-600 transition-all ${
              file
                ? 'border-[1px] border-gray-200 pr-12'
                : 'border-dashed border-gray-300'
            }`}
          >
            {/* Conditionally render the icon for clearing the input */}
            {!file && <Icon name="paperclip" key="paperclip" size="lg" />}
            {/* Conditionally render the file name if a file is selected */}
            <span className="text-gray-500 text-sm font-vazirmatn font-medium text-right shrink-0">
              {file
                ? `${file.name} ${getFileSize(file)} 

`
                : 'انتخاب فایل اکسل (.xls یا .xlsx) تا حداکثر حجم ۲ مگابایت'}
            </span>
          </div>
        }
      />
    </>
  );
};

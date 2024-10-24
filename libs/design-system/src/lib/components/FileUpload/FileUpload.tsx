import React, { useState } from 'react';
import { Icon } from '../Icon';
// import { FileUploader } from 'react-drag-drop-files';

type FileUploadProps = {
  types: string[];
};

const formatFileSize = (file: File): string => {
  const sizeInBytes = file.size;
  const sizeInKB = sizeInBytes / 1024;
  const sizeInMB = sizeInKB / 1024;

  if (sizeInKB < 1) return `${sizeInBytes} bytes`;
  if (sizeInKB < 1024) return `${sizeInKB.toFixed(2)} KB`;
  return `${sizeInMB.toFixed(2)} MB`;
};

export const FileUpload: React.FC<FileUploadProps> = ({ types }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (selectedFile: File) => setFile(selectedFile);

  const clearFile = (e: React.MouseEvent) => {
    setFile(null);
  };
  return (
    <>
      {file && (
        <div onClick={clearFile} className="cursor-pointer z-10 ml-[-40px]">
          <Icon name="trash-2" size="lg" />
        </div>
      )}

      {/* <FileUploader handleChange={handleFileChange} name="file" types={types}>
        <div
          className={`group border-2 rounded-md p-[15px_16px] flex items-center gap-2 relative w-max transition-all hover:border-brand-600 text-right ${
            file
              ? 'border-[1px] border-gray-200 pr-12'
              : 'border-dashed border-gray-300'
          }`}
        >
          {!file && (
            <div className="text-gray-500 group-hover:text-brand-700">
              <Icon name="paperclip" size="lg" />
            </div>
          )}
          <span
            className={`text-gray-500 group-hover:text-brand-700 text-sm font-vazirmatn font-medium text-right shrink-0`}
          >
            {' '}
            {file
              ? `${file.name} (${formatFileSize(file)})`
              : 'انتخاب فایل اکسل (.xls یا .xlsx) تا حداکثر حجم ۲ مگابایت'}
          </span>
        </div>
      </FileUploader> */}
    </>
  );
};

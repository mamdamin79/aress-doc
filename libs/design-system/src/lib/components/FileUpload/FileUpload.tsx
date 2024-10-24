import React, { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import { FileUploader } from 'react-drag-drop-files';
import { formatFileSize } from './FileUpload.utils';

type FileUploadProps = {
  types: string[];
  maxSize: number;
};

export const FileUpload: React.FC<FileUploadProps> = ({ types, maxSize }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isValidTypes, setIsValidTypes] = useState(true);
  const [isFileSizeValid, setIsFileSizeValid] = useState(true);

  useEffect(() => {
    if (!Array.isArray(types) || types.length === 0) {
      setIsValidTypes(false);
    } else {
      setIsValidTypes(true);
    }
  }, [types]);

  const handleFileChange = (selectedFile: File) => {
    if (selectedFile.size > maxSize) {
      setIsFileSizeValid(false);
    } else {
      setIsFileSizeValid(true);
    }
    setFile(selectedFile);
  };

  const clearFile = (e: React.MouseEvent) => {
    setFile(null);
  };

  return (
    <>
      {file && (
        <button onClick={clearFile} className="cursor-pointer z-10 ml-[-40px]">
          <Icon name="trash-2" size="lg" />
        </button>
      )}

      <FileUploader handleChange={handleFileChange} name="file" types={types}>
        <div
          className={`group border-2 rounded-md p-[15px_16px] flex items-center gap-2 relative w-max transition-all hover:border-brand-600 text- ${
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
      </FileUploader>
    </>
  );
};

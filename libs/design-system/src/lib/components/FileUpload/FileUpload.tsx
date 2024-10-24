import React, { useState } from 'react';
import { Icon } from '../Icon';
// import { FileUploader } from 'react-drag-drop-files';
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
    </>
  );
};

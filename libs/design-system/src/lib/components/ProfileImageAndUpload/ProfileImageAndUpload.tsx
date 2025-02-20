import React, { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import { FileUploader } from 'react-drag-drop-files';
import { FileUploadErrorType } from '../FileUpload/FileUpload.constants';
import { formatFileSize } from '../FileUpload/FileUpload.utils';
import Image from 'next/image';
const UserSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="120"
    height="120"
    viewBox="0 0 24 24"
    fill="#CACDD3"
  >
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </svg>
);
type FileUploadProps = {
  types: string[];
  maxSize: number;
  onError?: (errorType: FileUploadErrorType) => void;
  image?: string | null;
};

export const ProfileImageAndUpload: React.FC<FileUploadProps> = ({
  types,
  maxSize,
  onError,
  image,
}) => {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!Array.isArray(types) || types.length === 0) {
      onError?.('INVALID_FILE_TYPE');
      return;
    } else {
      return;
    }
  }, [types, onError]);

  const handleFileChange = (selectedFile: File) => {
    const fileExtension = selectedFile.name.split('.').pop();
    if (!!fileExtension && !types.includes(fileExtension)) {
      onError?.('INVALID_FILE_TYPE');
      return;
    }

    if (selectedFile.size > maxSize) {
      onError?.('FILE_TOO_LARGE');
      return;
    }
    console.log('valid');
    setFile(selectedFile);
  };

  return (
    <>
      <FileUploader handleChange={handleFileChange} name="file" types={types}>
        <div className="bg-baseBackground relative h-32 w-32 rounded-full border-2 border-gray-100 p-1">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
            {image ? (
              <Image
                alt="profile image"
                src={image}
                width={120}
                height={120}
                className="h-[120px] w-[120px] object-contain"
              />
            ) : (
              <UserSVG />
            )}
          </div>
          <div className="bg-baseBackground absolute left-[88px] top-[88px] flex h-10 w-10 items-center justify-center rounded-full text-gray-700 shadow-2xl">
            <Icon name="image-up" size="lg" />
          </div>
        </div>
      </FileUploader>
    </>
  );
};

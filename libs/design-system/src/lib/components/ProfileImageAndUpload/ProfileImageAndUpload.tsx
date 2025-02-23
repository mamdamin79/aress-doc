import React, { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import { FileUploader } from 'react-drag-drop-files';
import { FileUploadErrorType } from '../FileUpload/FileUpload.constants';
import USER_SVG from '../../../assets/icons/profile vector-large.svg';
import Image from 'next/image';
import { cn } from 'libs/design-system/src/utils';

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
  const [preview, setPreview] = useState<string | null>(image || null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!Array.isArray(types) || types.length === 0) {
      onError?.('INVALID_FILE_TYPE');
      return;
    }
  }, [types, onError]);

  useEffect(() => {
    if (file) {
      setIsLoading(true);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const handleFileChange = (selectedFile: File) => {
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !types.includes(fileExtension)) {
      onError?.('INVALID_FILE_TYPE');
      return;
    }

    if (selectedFile.size > maxSize) {
      onError?.('FILE_TOO_LARGE');
      return;
    }

    setFile(selectedFile);
  };

  const imageDimension = preview ? 120 : 80;
  return (
    <FileUploader handleChange={handleFileChange} name="file" types={types}>
      <div className="bg-baseBackground relative h-32 w-32 rounded-full border-2 border-gray-100 p-1">
        <div className="flex h-full w-full items-end justify-center overflow-hidden rounded-full">
          <Image
            alt="profile image"
            src={preview ? preview : USER_SVG}
            width={imageDimension}
            height={imageDimension}
            className={cn('object-cover', preview && `h-[120px] w-[120px]`)}
          />
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          </div>
        )}
        <div className="bg-baseBackground absolute left-[88px] top-[88px] flex h-10 w-10 items-center justify-center rounded-full text-gray-700 shadow-2xl">
          <Icon name="image-up" size="lg" />
        </div>
      </div>
    </FileUploader>
  );
};

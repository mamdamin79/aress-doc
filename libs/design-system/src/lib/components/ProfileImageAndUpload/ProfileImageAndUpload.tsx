'use client';
import React, { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import { FileUploader } from 'react-drag-drop-files';
import { FileUploadErrorType } from '../FileUpload/FileUpload.constants';
import { ReactComponent as USER_SVG } from '../../../assets/icons/profile vector-large.svg';
import { cn } from '../../../utils';

type FileUploadProps = {
  types: string[];
  maxSize: number;
  onError?: (errorType: FileUploadErrorType) => void;
  image?: string | null;
  loadingInitial: boolean;
  onImageSelect?: (image: Blob) => void;
};

export const ProfileImageAndUpload: React.FC<FileUploadProps> = ({
  types,
  maxSize,
  onError,
  image,
  loadingInitial,
  onImageSelect,
}) => {
  const [isLoading, setIsLoading] = useState(loadingInitial);

  useEffect(() => {
    if (!Array.isArray(types) || types.length === 0) {
      onError?.('INVALID_FILE_TYPE');
      return;
    }
  }, [types, onError]);
  useEffect(() => {
    setIsLoading(loadingInitial);
  }, [loadingInitial]);

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
    onImageSelect?.(selectedFile);
  };

  const imageDimension = image ? 120 : 80;
  return (
    <div className="outline-none">
      <FileUploader handleChange={handleFileChange} name="file" types={types}>
        <div className="bg-surface-neutral-primary border-border-neutral-tertiary relative h-32 w-32 rounded-full border-2 p-1 outline-none">
          <div className="flex h-full w-full items-end justify-center overflow-hidden rounded-full">
            <div
              className={cn(
                'flex items-center justify-center object-cover',
                `h-[120px] w-[120px]`,
              )}
            >
              {image ? (
                <img
                  alt="profile image"
                  src={image}
                  width={imageDimension}
                  height={imageDimension}
                  className={cn('object-cover', image && `h-[120px] w-[120px]`)}
                />
              ) : (
                <USER_SVG
                  width={80}
                  height={80}
                  className="-mb-8 h-[90px] w-[90px] object-contain"
                />
              )}
            </div>
          </div>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            </div>
          )}
          <div className="bg-surface-neutral-primary text-text-neutral-secondarycontrast absolute left-[88px] top-[88px] flex h-10 w-10 items-center justify-center rounded-full shadow-2xl">
            <Icon name="image-up" size="lg" />
          </div>
        </div>
      </FileUploader>
    </div>
  );
};

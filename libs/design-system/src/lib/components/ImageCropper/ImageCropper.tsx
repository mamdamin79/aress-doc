'use client';
import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { CroppedArea, ImageCropperProps } from './ImageCropper.types';
import { getCroppedImg } from './ImageCropper.utils';
import { Button } from '../Button';
import { SUBTITLE, TITLE } from './ImageCropper.constants';
import { Dialog } from '../Dialog';

export const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  onChange,
  isOpen = false,
  onClose,
}) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedArea | null>(null);
  const onCropComplete = useCallback(
    (croppedArea: CroppedArea, pixels: CroppedArea) => {
      setCroppedAreaPixels(pixels);
    },
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = useCallback(async () => {
    setIsLoading(true);
    if (croppedAreaPixels) {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      if (croppedImage) onChange?.(croppedImage);
      onClose?.();
    }
    setIsLoading(false);
  }, [croppedAreaPixels, image, onChange]);
  return (
    <Dialog isOpen={isOpen} onClose={() => onClose?.()} className="w-[500px]">
      <div
        className="mb-4 flex items-center justify-between"
        id="crop-image-title"
      >
        <div className="flex w-full flex-col gap-6">
          <h2 className="text-md text-center font-medium">{TITLE}</h2>
          <p className="text-right text-sm font-normal">{SUBTITLE}</p>
        </div>
      </div>
      <div className="relative mb-4 h-64 w-full">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          cropShape="round"
          showGrid={true}
        />
      </div>
      <div className="flex w-full flex-row justify-end gap-2">
        <div className="w-20">
          <Button
            align="center"
            isLoading={false}
            mode="secondary"
            size="sm"
            onClick={() => onClose?.()}
            theme="brand"
          >
            انصراف
          </Button>
        </div>
        <div className="w-20">
          <Button
            onClick={handleSave}
            align="center"
            isLoading={isLoading}
            mode="primary"
            size="sm"
            theme="brand"
          >
            ذخیره
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

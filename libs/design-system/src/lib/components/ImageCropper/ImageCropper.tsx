import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { CroppedArea, ImageCropperProps } from './ImageCropper.types';
import { getCroppedImg } from './ImageCropper.utils';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { SUBTITLE, TITLE } from './ImageCropper.constants';
import { DialogPanel } from '@headlessui/react';

export const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  onChange,
  onClose,
  isOpen = false,
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
  }, [croppedAreaPixels, image, onChange, onClose]);
  return (
    <DialogPanel className="relative w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
      <div
        onClick={onClose}
        className="absolute left-0 top-0 -ml-2 -mt-2 flex items-center justify-center rounded-full shadow-lg"
      >
        <Icon name="CustomCirlcleX" key={`CustomCirlcleX`} size="lg_plus" />
      </div>
      <DialogTitle
        as="div"
        className="mb-4 flex items-center justify-between"
        id="crop-image-title"
      >
        <div className="flex w-full flex-col gap-6">
          <h2 className="text-md text-center font-medium">{TITLE}</h2>
          <p className="text-right text-sm font-normal">{SUBTITLE}</p>
        </div>
      </DialogTitle>
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
            onClick={onClose}
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
          >
            ذخیره
          </Button>
        </div>
      </div>
    </DialogPanel>
  );
};

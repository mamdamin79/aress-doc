import React, { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';
import Cropper from 'react-easy-crop';
import { ImageCropperProps } from './ImageCropper.types';
import { getCroppedImg } from './ImageCropper.utils';
import { Button } from '../Button';
import { Icon } from '../Icon';
interface CroppedArea {
  width: number;
  height: number;
  x: number;
  y: number;
}
export const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  onChange,
  onClose,
  isOpen,
}) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedArea | null>(null);
  const onCropComplete = (croppedArea: CroppedArea, pixels: CroppedArea) => {
    setCroppedAreaPixels(pixels);
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = async () => {
    setIsLoading(true);
    if (croppedAreaPixels) {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      if (croppedImage) onChange?.(croppedImage);
      onClose?.();
    }
    setIsLoading(false);
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => onClose?.()}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="relative flex w-[500px] transform flex-col gap-6 rounded-2xl border-2 border-gray-200 bg-white p-6 align-middle transition-all">
                <div
                  onClick={onClose}
                  className="absolute left-0 top-0 -ml-2 -mt-2 flex items-center justify-center rounded-full shadow-lg"
                >
                  <Icon
                    name="CustomCirlcleX"
                    key={`CustomCirlcleX`}
                    size="lg_plus"
                  />
                </div>
                <DialogTitle className="flex w-full items-center justify-between">
                  <div className="flex w-full flex-col gap-6 text-center">
                    <h2 className="text-md font-medium">برش عکس</h2>
                    <p className="text-right text-sm font-normal">
                      ناحیه‌ی دلخواه برای تصویر نمایه را با تنظیم کادر تعیین
                      کنید.
                    </p>
                  </div>
                </DialogTitle>
                <div className="relative h-[304px] w-full">
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
                      size="md"
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
                      size="md"
                    >
                      ذخیره
                    </Button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

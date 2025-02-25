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
import { X } from 'lucide-react';
import { ImageCropperProps } from './ImageCropper.types';
import { getCroppedImg } from './ImageCropper.utils';
import { Button } from '../Button';
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
  const handleSave = async () => {
    if (croppedAreaPixels) {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onChange?.(croppedImage);
      onClose?.();
    }
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
              <DialogPanel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="div"
                  className="mb-4 flex items-center justify-between"
                >
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Crop Image
                  </h3>
                  <button
                    onClick={() => onClose?.()}
                    className="rounded-full p-1 transition-colors hover:bg-gray-100"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
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
                    showGrid={false}
                  />
                </div>
                <div className="mt-4 flex justify-end space-x-2">save</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

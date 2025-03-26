export interface CroppedArea {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface ImageCropperProps {
  image: string;
  onChange?: (croppedImage: string) => void;
  onClose?: () => void;
  isOpen?: boolean;
}

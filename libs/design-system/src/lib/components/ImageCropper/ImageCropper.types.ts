export interface ImageCropperProps {
  image: string;
  onChange?: (croppedImage: string) => void;
  onClose?: () => void;
  isOpen: boolean;
}

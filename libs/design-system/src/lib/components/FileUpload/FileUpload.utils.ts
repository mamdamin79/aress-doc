export const formatFileSize = (file: File): string => {
  const sizeInBytes = file.size;
  const sizeInKB = sizeInBytes / 1024;
  const sizeInMB = sizeInKB / 1024;

  if (sizeInKB < 1) return `${sizeInBytes} bytes`;
  if (sizeInKB < 1024) return `${sizeInKB.toFixed(2)} KB`;
  return `${sizeInMB.toFixed(2)} MB`;
};

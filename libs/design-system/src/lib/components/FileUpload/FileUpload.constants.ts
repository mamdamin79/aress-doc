export const FileUploadErrorTypes = {
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
} as const;

export type FileUploadErrorType = keyof typeof FileUploadErrorTypes;

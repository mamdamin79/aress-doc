import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { IconName } from '../../../../../libs/design-system/src/lib/components/Icon/Icon.types';
import { GetUsersMeResponse } from '@openapi';

export interface ProfileFormProps {
  fnameAndLname?: string;
  phoneNumber: string;
  nationalID?: number;
  email?: string;
  username?: string;
  image?: string;
  onImageChange?: (image:string)=>void;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<GetUsersMeResponse, unknown>>
}
export type editDialogStatus =
  | 'phoneNumber'
  | 'email'
  | 'username'
  | 'password'
  | 'success'
  | null;
export interface FormSchemaType {
  name: string;
  label: string;
  value?: string | number;
  edit?: editDialogStatus;
  icon: IconName;
}
export enum editDialogVerbs {
  phoneNumber = 'شماره همراه',
  username = 'نام کاربری',
  email = 'ایمیل',
}

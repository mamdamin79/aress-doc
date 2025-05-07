import { IconName } from '../../../../../libs/design-system/src/lib/components/Icon/Icon.types';

export interface ProfileFormProps {
  fnameAndLname?: string;
  phoneNumber: string;
  nationalID?: number;
  email?: string;
  username?: string;
  image?: string;
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

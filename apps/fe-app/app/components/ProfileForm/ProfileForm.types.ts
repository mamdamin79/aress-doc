export interface ProfileFormProps {
  fnameAndLname?: string;
  phoneNumber: string;
  nationalID?: number;
  email?: string;
  username?: string;
  image?: string;
}
export type editDialogStatus = "phoneNumber" | "email" | "username" | "password" | "success" | null
export interface FormSchemaType  {
  name: string,
  label: string,
  value?: string | number,
  edit?: editDialogStatus,
}
export enum editDialogVerbs {
  phoneNumber = 'شماره همراه',
  username = 'نام کاربری',
  email = 'ایمیل',
}
import { IconName } from 'design-system';

export interface FormSchemaType {
  name: string;
  label: string;
  value?: string | number;
  icon?: IconName;
}

import { FormSchemaType } from '../FormWrapper/FormWrapper.types';

export const formSchema: FormSchemaType[] = [
  {
    name: 'country',
    label: 'کشور',
    value: 'ایران',
  },
  {
    name: 'province',
    label: 'استان',
    value: 'تهران',
  },
  { name: 'city', label: 'شهر', value: 'تهران' },
  {
    name: 'street',
    label: 'خیابان',
    value: 'آقایی',
  },
  {
    name: 'postalCode',
    label: 'کد پستی',
    value: '۳۲۳۴۲۳۴۲۲۴۳',
  },
  {
    name: 'houseNumber',
    label: 'پلاک',
    value: '23',
  },
];

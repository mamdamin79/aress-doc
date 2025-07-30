import { IconName, TextField } from 'design-system';

export interface FormSchemaType {
  name: string;
  label: string;
  value?: string | number;
  icon?: IconName;
}
const formSchema: FormSchemaType[] = [
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

export const AddressForm: React.FC = () => {
  //   const {
  //     control,
  //     handleSubmit,
  //     setValue,
  //     formState: { isSubmitting },
  //   } = useForm<LoginFormValues>({
  //     defaultValues: {
  //       username: '',
  //       password: '',
  //       remember: false,
  //       captcha: '',
  //       captchaUid: undefined,
  //     },
  //   });

  return (
    <form
      dir="rtl"
      className="bg-surface-neutral-primary border-border-neutral-primary flex w-full flex-col gap-6 rounded-3xl border p-6"
      //   onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {formSchema.map(({ name, label, value }) => (
          <TextField
            key={name}
            className="w-[444px]"
            mergeTitleAndPlaceholder={false}
            mode="filled"
            type="text"
            trailingIcons={[]}
            label={label}
            placeholder=""
            readOnly
            value={value}
          />
        ))}
      </div>
    </form>
  );
};

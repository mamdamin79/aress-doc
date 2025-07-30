import { TextField } from 'design-system';

export interface FormSchemaType {
  name: string;
  label: string;
  value?: string | number;
}
const formSchema: FormSchemaType[] = [
  {
    name: 'Bank Name',
    label: 'نام بانک',
    value: 'بانک ملت',
  },
  {
    name: 'BranchCode',
    label: 'کد شعبه',
    value: '8845',
  },
  { name: 'BranchName', label: 'نام شعبه', value: 'شهید رجایی' },
  {
    name: 'AccountType',
    label: 'نوع حساب',
    value: 'جاری',
  },
  {
    name: 'accountNumber',
    label: 'شماره حساب',
    value: '۳۲۴۱۴۵۷۶۶',
  },
  {
    name: 'IBAN',
    label: 'شماره شبا',
    value: 'IR۲۲۰۲۳۴۲۴۲۳۴۲۳۴۲۳۴۲',
  },
];

export const BankAccountInformation: React.FC = () => {
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

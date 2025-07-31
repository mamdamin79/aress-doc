import { FormWrapper } from '../FormWrapper/FormWrapper';
import { formSchema } from './AddressForm.constants';

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
    // <form
    //   dir="rtl"
    //   className="bg-surface-neutral-primary border-border-neutral-primary flex w-full flex-col gap-6 rounded-3xl border p-6"
    //   //   onSubmit={handleSubmit(onSubmit)}
    // >
    //   <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
    //     {formSchema.map(({ name, label, value }) => (
    //       <TextField
    //         key={name}
    //         className="w-[444px]"
    //         mergeTitleAndPlaceholder={false}
    //         mode="filled"
    //         type="text"
    //         trailingIcons={[]}
    //         label={label}
    //         placeholder=""
    //         readOnly
    //         value={value}
    //       />
    //     ))}
    //   </div>
    // </form>
    <FormWrapper formSchema={formSchema} />
  );
};

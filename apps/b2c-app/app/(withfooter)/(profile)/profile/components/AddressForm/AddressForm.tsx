import { FormWrapper } from '../FormWrapper/FormWrapper';
import { formSchema } from './AddressForm.constants';

export const AddressForm: React.FC = () => {
  return (
    <div className="mb-6">
      <FormWrapper formSchema={formSchema} title="آدرس" />
    </div>
  );
};

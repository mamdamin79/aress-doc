import { FormWrapper } from '../FormWrapper/FormWrapper';
import { formSchema } from './BankAccountInformation.constants';

export const BankAccountInformation: React.FC = () => {
  return <FormWrapper title="اطلاعات بانکی" formSchema={formSchema} />;
};

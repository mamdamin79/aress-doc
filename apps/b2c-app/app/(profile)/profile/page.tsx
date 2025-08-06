'use client';
import { AddressForm } from './components/AddressForm/AddressForm';
import { BankAccountInformation } from './components/BankAccountInformation/BankAccountInformation';
import { ProfileForm } from './components/ProfileForm/ProfileForm';

export default function Profile() {
  return (
    <div className="hidden max-w-[1032px] flex-grow md:block">
      <ProfileForm />
      <AddressForm />
      <BankAccountInformation />
    </div>
  );
}

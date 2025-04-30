import React from 'react';
import { AressApiUser, OpenAPI, UsersService } from '@openapi';
import { ProfileForm } from '../../../components';
import { ProfileSidebarWrapper } from './_components/ProfileSidebarWrapper';
async function getData() {
  OpenAPI.HEADERS = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzQ2MDg5OTk1fQ.HNohfZhu-PIAodja4h751LIxd0T93etbr0ZJuU4QiH4`,
  };

  const user = (await UsersService.getUsersMe()) as AressApiUser;
  return user;
}
const page = async () => {
  const user = await getData();
  return (
    <div className="flex max-w-[1680px] flex-col gap-14 px-20 pb-28 pt-12 lg:flex-row">
      <ProfileSidebarWrapper title="علی محمدی" subTitle="09339133898" />
      <ProfileForm
        email={user.email}
        fnameAndLname=""
        nationalID={user.nationalCode ? Number(user.nationalCode) : undefined}
        phoneNumber={user.phoneNumber?.replace('+', '') + '+'}
        username={user.username}
      />
    </div>
  );
};

export default page;

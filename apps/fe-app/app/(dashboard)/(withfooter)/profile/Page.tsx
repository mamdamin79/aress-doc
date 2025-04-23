import React from 'react';
import { ProfileSidebar } from 'design-system';
import { AressApiUser, OpenAPI, UsersService } from '@openapi';
import { ProfileForm } from 'apps/fe-app/app/components';
async function getData() {
  OpenAPI.HEADERS = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzQ1NDE2MjY5fQ.fYoeXOvstJcWxcoExDW1fwwmvzi0L7aXqgO_3viizU0`,
  };

  const user = (await UsersService.getUsersMe()) as AressApiUser;
  return user;
}
const page = async () => {
  const user = await getData();
  return (
    <div className="flex flex-row gap-14 px-20 pb-28 pt-12">
      <ProfileSidebar title="علی محمدی" subTitle="09339133898" />
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

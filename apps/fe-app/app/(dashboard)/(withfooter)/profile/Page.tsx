import React from 'react';
import { ProfileForm } from '../../components';
import { ProfileSidebar } from 'design-system';
import { AressApiUser, OpenAPI, UsersService } from '@openapi';
async function getData() {
  OpenAPI.HEADERS = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzQxMzM1NzMyfQ.nICY2AM83yNpJSr1y0-dgnbx_dl9xPY_Xy5ucj9kC9s`,
  };

  const user = (await UsersService.getUsersMe()) as AressApiUser;
  return user;
}
const page = async () => {
  const user = await getData();
  return (
    <div className="flex flex-row gap-14 px-20 pb-28 pt-12">
      <ProfileSidebar
        activeIndex={0}
        title="علی محمدی"
        subTitle="09339133898"
      />
      <ProfileForm
        email={user.email}  
        fnameAndLname=""
        nationalCode={user.nationalCode}
        phoneNumber={user.phoneNumber?.replace('+', '') + '+'}
        username={user.username}
      />
    </div>
  );
};

export default page;

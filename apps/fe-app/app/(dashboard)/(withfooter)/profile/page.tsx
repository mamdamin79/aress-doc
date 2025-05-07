import React from 'react';
import { AressApiUser, OpenAPI, UsersService } from '@openapi';
import { ProfilePageContent } from './_components';
async function getData() {
  OpenAPI.HEADERS = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzQ2MDg5OTk1fQ.HNohfZhu-PIAodja4h751LIxd0T93etbr0ZJuU4QiH4`,
  };

  const user = (await UsersService.getUsersMe()) as AressApiUser;
  return user;
}
const page = async () => {
  const user = await getData();
  return <ProfilePageContent {...user} />;
};

export default page;

import React from 'react';
import { AressApiUser, OpenAPI, UsersService } from '@openapi';
import { ProfilePageContent } from './_components';
import { fetchToken } from '../../../(auth)/auth.utils';

async function getData() {
  const token = await fetchToken();
  if (!token) {
    throw new Error('Failed to fetch access token');
  }
  OpenAPI.HEADERS = {
    Authorization: `Bearer ${token}`,
  };  

  const user = (await UsersService.getUsersMe()) as AressApiUser;
  return user;
}
const page = async () => {
  const user = await getData();
  return <ProfilePageContent {...user} />;
};

export default page;

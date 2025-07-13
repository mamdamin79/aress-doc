import React from 'react';
import { SlidersBox } from './_components';
import { FundsSidebarWrapper } from './_components/FundsSidebarWrapper';
import { fetchToken } from '../../../(auth)/auth.utils';
import { OpenAPI } from '@openapi';
import { Toaster } from 'react-hot-toast';
const page = async () => {
  const token = await fetchToken();
  if (!token) {
    throw new Error('Failed to fetch access token');
  }
  OpenAPI.HEADERS = {
    Authorization: `Bearer ${token}`,
  };
  return (
    <div className="3xl:px-6 relative mt-8 flex min-h-screen w-full flex-row justify-center gap-8 px-8 pb-4 pr-10 md:px-0 lg:px-4 xl:px-0">
      <div className="w-1"></div>
      <SlidersBox />
      <FundsSidebarWrapper />
      <Toaster position="bottom-center" />
    </div>
  );
};

export default page;

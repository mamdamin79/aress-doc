'use client';
import { HeaderMenus } from 'design-system';
import React from 'react';
import { menu } from './menuFakeData';

export const HeaderMenuWrapper: React.FC = () => {
  return (
    <div className="mt-2">
      <HeaderMenus menuItems={menu} />
    </div>
  );
};

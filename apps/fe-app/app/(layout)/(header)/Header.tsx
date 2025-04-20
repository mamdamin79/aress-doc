'use client';
import { useWindowSize } from '@uidotdev/usehooks';
import React from 'react';
import { DESKTOP_BREAKPOINT } from './Header.constants';
import { BurgerMenu } from './BurgerMenu';
import { DesktopMenu } from './DesktopMenu';
import { MenuData } from './HeaderDataFull';

export const Header: React.FC = () => {
  const { width } = useWindowSize();
  if (typeof width !== 'number') return null;
  return width >= DESKTOP_BREAKPOINT ? (
    <DesktopMenu menuItems={MenuData} />
  ) : (
    <BurgerMenu menuItems={MenuData} />
  );
};

import { SVGProps } from 'react';
import { ReactComponent as CustomCalendar } from '../src/icons/CustomCalender.svg';
import { ReactComponent as CustomBag } from '../src/icons/CustomBag.svg';
import { ReactComponent as CustomBadge } from '../src/icons/CustomBadge.svg';
import { ReactComponent as CustomBeta } from '../src/icons/CustomBeta.svg';
import { ReactComponent as CustomCircleSlice } from '../src/icons/CustomCircleSlice.svg';
import { ReactComponent as CustomWallet } from '../src/icons/CustomWallet.svg';
import { ReactComponent as CustomScalesOfJustice } from '../src/icons/CustomScalesOfJustice.svg';
import { ReactComponent as CustomClock } from '../src/icons/CustomClock.svg';
import { ReactComponent as CustomCircularUser } from '../src/icons/CustomCircularUser.svg';
import { ReactComponent as CustomAlpha } from '../src/icons/CustomAlpha.svg';
import { ReactComponent as CustomClose } from '../src/icons/CustomClose.svg';

export const customIcons: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  CustomCalendar,
  CustomBag,
  CustomBadge,
  CustomBeta,
  CustomCircleSlice,
  CustomWallet,
  CustomScalesOfJustice,
  CustomClock,
  CustomCircularUser,
  CustomAlpha,
  CustomClose,
};

export const hoverClasses: Record<string, string> = {
  CustomCalendar: 'hover:text-brand-600',
  CustomBag: 'hover:text-brand-600',
  CustomBadge: 'hover:text-brand-600 hover:-rotate-6',
  CustomBeta: 'hover:text-brand-600 hover:-rotate-6',
  CustomCircleSlice: 'hover:text-brand-600 hover:scale-105 ',
  CustomWallet: 'hover:text-brand-600 group',
  CustomScalesOfJustice: 'hover:text-brand-600 ',
  CustomClock: 'hover:text-brand-600 hover:rotate-90',
  CustomcircularUser: 'hover:text-brand-600',
  CustomAlpha: 'hover:text-brand-600',
  CustomClose: 'text-brand-600',
};

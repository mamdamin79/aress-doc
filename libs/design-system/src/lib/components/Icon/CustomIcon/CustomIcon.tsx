import React from 'react';
import { IconProps } from '../Icon';
import { sizeValues, strokeValues } from '../Icon.constants';
import { customIcons } from './CustomIcon.contants';
import { cn } from '../../../../utils/classNames.utils';

export const CustomIcon: React.FC<IconProps> = ({ name, size = 'md' }) => {
  const CustomIconComponent = customIcons[name as keyof typeof customIcons];
  return (
    <div className="relative hover:text-brand-600 group inline-block">
      <CustomIconComponent
        width={sizeValues[size]}
        height={sizeValues[size]}
        strokeWidth={strokeValues[size]}
        className={cn(
          `stroke-current transition-all duration-150 ease-in-out cursor-pointer`,
          { 'hover:text-brand-600 hover:rotate-90': name === 'CustomClock' },
          { 'hover:text-brand-600': name === 'CustomBag' },
          { 'hover:text-brand-600 hover:-rotate-6': name === 'CustomBadge' },
          { 'hover:text-brand-600 hover:-rotate-6': name === 'CustomBeta' },
          {
            'hover:text-brand-600 hover:scale-105':
              name === 'CustomCircleSlice',
          },
          { 'hover:text-brand-600 group': name === 'CustomWallet' },
          { 'hover:text-brand-600': name === 'CustomScalesOfJustice' },
          { 'hover:text-brand-600': name === 'CustomcircularUser' },
          { 'hover:text-brand-600': name === 'CustomAlpha' },
          { 'hover:text-brand-600': name === 'CustomCalendar' },
          { 'text-brand-600': name === 'CustomClose' }
        )}
      />
      {name === 'CustomWallet' && (
        <>
          <svg
            width="24"
            height="24"
            viewBox="0 0 30 30"
            fill="none"
            className="absolute right-0 top-0 stroke-current -z-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="dd"
              d="M24.499 18.9149V23.5816C24.499 23.891 24.3761 24.1877 24.1573 24.4065C23.9385 24.6253 23.6418 24.7482 23.3324 24.7482H5.83236C5.21353 24.7482 4.62003 24.5024 4.18245 24.0648C3.74486 23.6272 3.49903 23.0337 3.49903 22.4149C3.49903 22.4149 3.49901 6.89267 3.49903 6.08156C3.49905 5.27045 3.62633 4.8077 4.07291 4.24905C4.51948 3.6904 5.14453 3.47022 5.61025 3.47017C6.07597 3.47012 20.4066 3.4699 20.8064 3.47017C21.2062 3.47044 21.6118 3.64064 21.8293 3.85812C22.0467 4.0756 22.1487 4.25568 22.2762 4.69671C22.4036 5.13773 22.2762 8.28904 22.2762 8.28904"
              stroke=""
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            className={`absolute stroke-current  -translate-y-1   transition-all duration-1000 right-0 block -z-10 top-0`}
            width="24"
            height="24"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="white">
              <path
                className="group-hover:animate-mm "
                d="M22.2098 25.0924L18.1414 9.9087C17.8605 8.86049 16.7831 8.23843 15.7349 8.5193L8.14302 10.5535C7.0948 10.8344 6.47274 11.9118 6.75361 12.96L10.8221 28.1437C11.1029 29.1919 12.1804 29.814 13.2286 29.5331L20.8204 27.4989C21.8686 27.218 22.4907 26.1406 22.2098 25.0924Z"
                fill=""
                stroke=""
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                className="group-hover:animate-dd"
                d="M12.5837 19.5347C12.8646 20.5829 13.942 21.205 14.9902 20.9241C16.0385 20.6432 16.6605 19.5658 16.3797 18.5176C16.0988 17.4694 15.0213 16.8473 13.9731 17.1282C12.9249 17.4091 12.3029 18.4865 12.5837 19.5347Z"
                fill=""
                stroke=""
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle
                className="group-hover:animate-moveCircle"
                cx="12.9564"
                cy="13.3321"
                r="0.714206"
                fill=""
              />
            </g>
          </svg>
        </>
      )}
    </div>
  );
};

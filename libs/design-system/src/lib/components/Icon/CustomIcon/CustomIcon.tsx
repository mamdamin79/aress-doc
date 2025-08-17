import React from 'react';
import { IconProps } from '../Icon';
import { SIZE_VALUES, STROKE_VALUES } from '../Icon.constants';
import { CUSTOM_ICONS } from './CustomIcon.constants';
import { cn } from '../../../../utils/classNames.utils';

const ICONS_WITH_NO_STROKE_CONTROL = [
  'CustomDay',
  'CustomEghtesadNovin',
  'CustomGardeshgari',
  'CustomGharzolhasaneMehrIran',
  'CustomHakmatIranian',
  'CustomIranzamin',
  'CustomKeshavarzi',
  'CustomKhavarmianeh',
  'CustomMaskan',
  'CustomMehrEghtesad',
  'CustomMellat',
  'CustomMelliIran',
  'CustomParsian',
  'CustomPasargad',
  'CustomPostBankIran',
  'CustomRefah',
  'CustomSaderat',
  'CustomSaman',
  'CustomSanatMadn',
  'CustomSarmayeh',
  'CustomSepah',
  'CustomShahr',
  'CustomSina',
  'CustomTejarat',
  'CustomToseeTaavon',
  'CustomAyandeh',
  'CustomPng',
  'CustomPdf',
];

const ICONS_WITH_VIEWBOX_ISSUE = [
  'CustomDay',
  'CustomEghtesadNovin',
  'CustomGardeshgari',
  'CustomGharzolhasaneMehrIran',
  'CustomHakmatIranian',
  'CustomIranzamin',
  'CustomKeshavarzi',
  'CustomKhavarmianeh',
  'CustomMaskan',
  'CustomMehrEghtesad',
  'CustomMellat',
  'CustomMelliIran',
  'CustomParsian',
  'CustomPasargad',
  'CustomPostBankIran',
  'CustomRefah',
  'CustomSaderat',
  'CustomSaman',
  'CustomSanatMadn',
  'CustomSarmayeh',
  'CustomSepah',
  'CustomShahr',
  'CustomSina',
  'CustomTejarat',
  'CustomToseeTaavon',
  'CustomAyandeh',
  'CustomPinLinear',
  'CustomPinFill',
  'CustomPinOffLinear',
  'CustomPinOffFill',
  'CustomPin',
  'CustomPlayLinear',
  'CustomPlayFill',
  'CustomCaretUp',
  'CustomCaretDown',
  'CustomPdfLite',
  'CustomCsvFile',
  'CustomPng',
  'CustomPdf',
];

export const CustomIcon: React.FC<IconProps> = ({ name, size = 'md' }) => {
  const CustomIconComponent = CUSTOM_ICONS[name as keyof typeof CUSTOM_ICONS];
  if (!CustomIconComponent) {
    console.error(`Icon component for name "${name}" not found`);
    return null;
  }

  const isHardcodedIcon = ICONS_WITH_NO_STROKE_CONTROL.includes(name);
  const isViewBoxIssueIcon = ICONS_WITH_VIEWBOX_ISSUE.includes(name);

  const iconProps: {
    width: number;
    height: number;
    stroke: string;
    strokeWidth: number;
    className: string;
    viewBox?: string;
  } = {
    width: SIZE_VALUES[size],
    height: SIZE_VALUES[size],
    stroke: isHardcodedIcon ? '' : 'currentColor',
    strokeWidth:
      isHardcodedIcon ||
      name === 'CustomBookmark' ||
      name === 'CustomArrow' ||
      name === 'CustomPin'
        ? 0
        : STROKE_VALUES[size],
    className: cn(
      `transition-all duration-150 ease-in-out`,
      {
        'hover:-rotate-6': name === 'CustomBadge' || name === 'CustomBeta',
      },
      { 'hover:rotate-90': name === 'CustomClock' },
      {
        'hover:scale-105': name === 'CustomCircleSlice',
      },
      {
        'stroke-white': name === 'CustomBookmark' || name === 'CustomArrow',
      },
      {
        'hover:text-text-brand-primary-600 cursor-pointer': !isHardcodedIcon,
      },
    ),
  };

  if (isViewBoxIssueIcon) {
    iconProps.viewBox = '0 0 24 24';
  }

  return (
    <div
      className={cn('group relative inline-block', {
        'text-text-brand-primary-600': name === 'CustomCirlcleX',
      })}
    >
      <CustomIconComponent {...iconProps} />
    </div>
  );
};

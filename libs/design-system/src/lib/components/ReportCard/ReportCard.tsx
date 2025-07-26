'use client';
import React from 'react';
import { Icon } from '../Icon';
import Image, { StaticImageData } from 'next/image';
import { NewBadge, VideoBadge, LikeBadge } from './Badges/Badges';
import { cn } from '../../../utils/classNames.utils';
import { Button } from '../Button';
import Link from 'next/link';

export interface ReportCardProps {
  title: string;
  summary: string;
  reportSubscription?: string;
  categoryType?: string;
  newBadge?: boolean;
  videoBadge?: boolean;
  image: StaticImageData | null;
  fixedBrief?: boolean;
  userFavorite?: boolean;
  link?: string;
  onLike?: () => void;
  shadowOnHover?: boolean;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  title,
  reportSubscription,
  summary,
  fixedBrief = false,
  categoryType,
  newBadge = false,
  videoBadge = false,
  image,
  userFavorite = false,
  link,
  onLike,
  shadowOnHover = false,
}) => {
  return (
    <div
      className={cn(
        `hover:shadow-7xl border-surface-neutral-secondary text-text-neutral-primary bg-surface-neutral-secondary group relative flex flex-col overflow-hidden rounded-3xl border-[2px] transition-all`,
        fixedBrief
          ? 'h-[448px] min-w-[380px] max-w-[512px] items-start'
          : 'h-[318px] min-w-[304px] max-w-[416px]',
        !shadowOnHover && 'hover:shadow-transparent',
      )}
    >
      {/* Image Section */}
      <div className="mt-3 w-full px-3">
        <div
          className={cn(
            `bg-surface-neutral-primary flex w-full items-center justify-center overflow-hidden rounded-xl shadow-md`,
            fixedBrief ? 'mx-auto h-[192px]' : 'h-[184px]',
          )}
        >
          {image && (
            <Image
              width={408}
              height={192}
              src={image}
              alt={title}
              className="h-full w-full object-contain"
            />
          )}
        </div>
      </div>

      {/* Info Section */}
      <div
        className={cn(
          `w-full`,
          !fixedBrief &&
            'from-coloropacity-surface-neutral-primary-0per via-surface-neutral-primary to-surface-neutral-primary absolute bottom-0 left-0 h-full overflow-hidden bg-gradient-to-b opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:duration-500',
        )}
      ></div>
      <div
        className={cn(
          `flex flex-col justify-between gap-3 p-4 transition-all duration-500 ease-in group-hover:duration-700`,
          fixedBrief
            ? 'h-[212px] items-baseline'
            : 'absolute bottom-6 right-0 max-h-[92px] items-end overflow-hidden transition-all ease-in-out group-hover:max-h-[250px]',
        )}
      >
        <div className="flex h-fit w-fit flex-col gap-2">
          <p
            className={cn(
              'text-text-neutral-primary text-md max-h-14 overflow-hidden truncate text-ellipsis font-medium',
              fixedBrief
                ? 'max-w-[508px]'
                : 'h-[26px] max-w-[416px] font-semibold',
            )}
          >
            {title}
          </p>
          <div className="text-text-neutral-secondarycontrast flex flex-row gap-4 text-right text-sm font-medium">
            {categoryType && (
              <span className="flex flex-row items-center gap-1">
                <Icon name="layers-2" key={categoryType} size="md" />
                {categoryType}
              </span>
            )}

            {reportSubscription && (
              <span className="flex flex-row items-center gap-1">
                <Icon name="package" key={reportSubscription} size="md" />
                {reportSubscription}
              </span>
            )}
            <div className="flex gap-2">
              {newBadge && <NewBadge />}
              {videoBadge && <VideoBadge />}
            </div>
          </div>

          {/* summary Section fixed */}
          {fixedBrief && (
            <>
              <span className="text-text-neutral-secondary line-clamp-3 text-right text-sm">
                {summary}
              </span>
              <div className="absolute bottom-4 right-0 flex w-full items-center justify-between px-4">
                <LikeBadge
                  isLiked={userFavorite}
                  onClick={() => onLike?.()}
                  hasFrame={true}
                  size="lg"
                />
                <div className="flex h-[38px] origin-left scale-x-[0.3] transform items-center overflow-hidden rounded-[100px] text-xs opacity-0 transition-all duration-300 ease-in-out group-hover:scale-x-100 group-hover:opacity-100">
                  <Link href={link ?? '/'}>
                    <Button
                      align="center"
                      isLoading={false}
                      mode="primary"
                      size="md"
                      className="w-fit"
                    >
                      <div className="flex items-center gap-2 whitespace-nowrap opacity-0 transition-colors duration-100 group-hover:opacity-100">
                        مشاهده گزارش
                        <Icon name="arrow-left" size="md" />
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* summary Section (Drawer Animation) */}
          {!fixedBrief && (
            <span className="text-text-neutral-secondary -mb-2 line-clamp-4 h-fit translate-y-12 transform overflow-hidden text-right text-sm opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              {summary}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

'use client';
import React, { useState } from 'react';
import {
  CommentExpandButtonProps,
  CommentOwnerProps,
  CommentSectionProps,
  BaseCommentProps,
} from './CommentSection.types';
import { cn } from '../../../utils';
import { Icon } from '../Icon';

const CommentExpandButton: React.FC<CommentExpandButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <button
      aria-expanded={isOpen}
      className={cn(
        'cursor-pointer select-none rounded-md px-2 py-1',
        'hover:border-button-brand-border-hover border border-transparent',
        'text-button-brand-label-plain-default hover:text-button-brand-label-plain-hover',
        'text-md flex w-fit items-center gap-1 font-medium',
        'transition-colors duration-300',
      )}
      onClick={onToggle}
    >
      {/* Cross-fade label */}
      <span className="relative inline-block min-w-[7ch]">
        <span
          className={cn(
            'absolute inset-0 transition-opacity duration-300',
            isOpen ? 'opacity-100' : 'opacity-0',
          )}
        >
          بستن
        </span>
        <span
          className={cn(
            'absolute inset-0 transition-opacity duration-300',
            isOpen ? 'opacity-0' : 'opacity-100',
          )}
        >
          نمایش بیشتر
        </span>
        {/* Reserve height to prevent layout shift */}
        <span className="opacity-0">نمایش بیشتر</span>
      </span>

      <div
        className={cn(
          'transition-transform duration-300',
          isOpen ? 'rotate-0' : 'rotate-180',
        )}
      >
        <Icon name="chevron-up" size="lg" />
      </div>
    </button>
  );
};

const ActionButtons: React.FC<{
  commentId: string;
  onEdit?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
}> = ({ commentId, onEdit, onDelete }) => {
  if (!onEdit && !onDelete) return null;

  return (
    <div className="text-icon-neutral-secondarycontrast flex items-center gap-6">
      {onEdit && (
        <button
          className="transition-opacity duration-300 hover:opacity-80"
          onClick={() => onEdit(commentId)}
        >
          <Icon name="pencil" size="md" />
        </button>
      )}
      {onDelete && (
        <button
          className="transition-opacity duration-300 hover:opacity-80"
          onClick={() => onDelete(commentId)}
        >
          <Icon name="trash-2" size="md" />
        </button>
      )}
    </div>
  );
};

const CommentOwnerInfo: React.FC<CommentOwnerProps> = ({
  author,
  timestamp,
}) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <div className="border-border-neutral-secondary flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full border">
        {author.profileImage ? (
          <img
            src={author.profileImage}
            alt="profile image"
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="text-icon-neutral-secondarycontrast">
            <Icon name="user" size="lg" />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-text-neutral-primary text-md font-medium">
          {author.name}
        </span>
        <span className="text-text-neutral-secondarycontrast text-xs font-medium">
          {timestamp}
        </span>
      </div>
    </div>
  );
};

const BaseComment: React.FC<BaseCommentProps> = ({
  author,
  content,
  id,
  timestamp,
  onDelete,
  onEdit,
  reply,
  isReply = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerClasses = cn(
    'flex w-full flex-col gap-6',
    isReply &&
      'bg-surface-neutral-tertiary border-border-neutral-secondary rounded-3xl border p-8',
  );

  const hasLineBreaksOrLong = content.includes('\n') || content.length > 300;
  const shouldShowExpandButton = hasLineBreaksOrLong;

  return (
    <div className={containerClasses}>
      <div className="flex w-full items-center justify-between">
        <CommentOwnerInfo author={author} timestamp={timestamp} />
        <ActionButtons commentId={id} onEdit={onEdit} onDelete={onDelete} />
      </div>

      <div className="flex w-full flex-col gap-2">
        {/* Content: two layers cross-fading. No fixed max-height => no half line. */}
        <div className="relative">
          {/* Collapsed (single-line with ellipsis) */}
          <div
            className={cn(
              'transition-opacity duration-300',
              isExpanded
                ? 'pointer-events-none absolute inset-0 opacity-0'
                : 'static opacity-100',
            )}
          >
            <span
              className={cn('line-clamp-2 block w-full text-sm font-normal')}
              dir="auto"
              title={content}
            >
              {content.replace(/\n/g, ' ')}
            </span>
          </div>

          {/* Expanded (full, multi-line) */}
          <div
            className={cn(
              'transition-opacity duration-300',
              isExpanded
                ? 'static opacity-100'
                : 'pointer-events-none absolute inset-0 opacity-0',
            )}
          >
            <span
              className="whitespace-pre-wrap break-words text-sm font-normal"
              dir="auto"
            >
              {content}
            </span>
          </div>
        </div>

        {shouldShowExpandButton && (
          <div className="flex w-full justify-end">
            <CommentExpandButton
              isOpen={isExpanded}
              onToggle={() => setIsExpanded((v) => !v)}
            />
          </div>
        )}
      </div>

      {reply && (
        <BaseComment
          {...reply}
          isReply={true}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
    </div>
  );
};

export const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onReply,
  onDelete,
  onEdit,
  className,
}) => {
  return (
    <div className={cn('relative flex w-full flex-col gap-6 px-6', className)}>
      <div className="bg-button-brand-label-plain-default absolute right-0 top-0 h-full w-1 rounded-lg" />
      <div className="flex flex-col gap-10">
        {comments.length > 0 &&
          comments.map((comment) => (
            <BaseComment
              key={comment.id}
              author={comment.author}
              content={comment.content}
              id={comment.id}
              reply={comment.reply}
              timestamp={comment.timestamp}
              onDelete={onDelete}
              onEdit={onEdit}
              onReply={onReply}
            />
          ))}
      </div>
    </div>
  );
};

import React from 'react';
import { cn } from '../../../utils';
import { Icon } from '../Icon';
import { SelectionChipsProps, ChipItem } from './SelectionChips.types';

export const SelectionChips: React.FC<SelectionChipsProps> = ({
  variant,
  items,
  selectedItems = [],
  onItemClick,
  onItemRemove,
  disabled = false,
  className,
  showChecked,
}) => {
  const handleChipClick = (itemId: string) => {
    if (!disabled && onItemClick) {
      onItemClick(itemId);
    }
  };

  const handleRemoveClick = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    if (!disabled && onItemRemove) {
      onItemRemove(itemId);
    }
  };

  const renderChip = (item: ChipItem) => {
    const isSelected = selectedItems.includes(item.id);
    const isInputChip = variant === 'input';
    const isFilterChip = variant === 'filter';

    return (
      <div
        key={item.id}
        onClick={() => handleChipClick(item.id)}
        className={cn(
          'inline-flex cursor-pointer select-none items-center gap-2 px-3 py-1 text-sm font-medium transition-all',
          'group rounded-xl border',

          // Input chip styles
          isInputChip && [
            // Default state
            'bg-surface-neutral-primary border-border-neutral-secondary text-text-neutral-secondarycontrast',
            // Hover state
            'hover:bg-surface-neutral-tertiary',
            // Pressed state
            'active:bg-surface-neutral-secondary',
            // Disabled state
            disabled &&
              'bg-surface-neutral-disable border-border-neutral-disable text-text-neutral-disable cursor-not-allowed',
          ],

          // Filter chip styles
          isFilterChip && [
            'border-0',
            // Default state (unselected)
            !isSelected && [
              'bg-surface-neutral-secondary text-text-neutral-secondarycontrast',
              // Hover state
              'hover:bg-surface-brand-200',
              // Pressed state
              'active:bg-surface-brand-500 active:text-text-neutral-white',
            ],
            // Selected state
            isSelected && [
              'bg-surface-brand-600-primary text-text-neutral-white',
              // Hover on selected
              'hover:bg-surface-brand-400',
              // Pressed on selected
              'active:bg-surface-brand-500',
            ],
            // Disabled state
            disabled && [
              'bg-surface-neutral-disable hover:bg-surface-neutral-disable text-text-neutral-disable active:bg-surface-neutral-disable active:text-text-neutral-disable cursor-not-allowed',
            ],
          ],
        )}
      >
        {/* Filter chip selected icon */}
        {isFilterChip && isSelected && showChecked && (
          <Icon name="check" size="md" />
        )}

        <span>{item.label}</span>

        {/* Input chip remove button */}
        {isInputChip && item.removable && (
          <button
            onClick={(e) => handleRemoveClick(e, item.id)}
            className={cn(
              'rounded-full-colors transition-colors',
              disabled && 'cursor-not-allowed opacity-50',
              !disabled &&
                'group-hover:text-icon-message-error-contrast-700 group-active:text-icon-message-error-highcontrast-800',
            )}
            disabled={disabled}
          >
            <Icon name="x" size="md" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {items.map(renderChip)}
    </div>
  );
};

export type { SelectionChipsProps, ChipItem } from './SelectionChips.types';

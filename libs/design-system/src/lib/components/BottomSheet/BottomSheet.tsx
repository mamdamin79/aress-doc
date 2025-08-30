'use client';
import React from 'react';
import { BottomSheet as ReactBottomSheet } from 'react-spring-bottom-sheet';
import { cn } from '../../../utils';
import { BottomSheetProps } from './BottomSheet.types';

// Import the CSS for react-spring-bottom-sheet
import 'react-spring-bottom-sheet/dist/style.css';
import '../../design-system.module.css';

export const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onDismiss,
  header,
  body,
  className,
  blocking = true,
  expandOnContentDrag = false,
}) => {
  return (
    <ReactBottomSheet
      open={open}
      onDismiss={onDismiss}
      blocking={blocking}
      expandOnContentDrag={expandOnContentDrag}
      className="no-header-border"
      defaultSnap={({ snapPoints, lastSnap }) =>
        lastSnap ?? Math.min(...snapPoints)
      }
      snapPoints={({ maxHeight }) => [
        maxHeight - maxHeight / 5,
        maxHeight * 0.6,
      ]}
      header={
        <div className="bg-surface-neutral-primary flex items-center justify-between">
          {/* Header Content */}
          <div className="flex-1">
            {header && (
              <div className="text-text-neutral-primary text-md font-semibold">
                {header}
              </div>
            )}
          </div>
        </div>
      }
    >
      {/* Body/Content Section */}
      <div
        className={cn(
          'bg-surface-neutral-primary text-text-neutral-primary',
          className,
        )}
      >
        {body}
      </div>
    </ReactBottomSheet>
  );
};

// Export types for external use
export type { BottomSheetProps };

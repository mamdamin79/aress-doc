'use client';
import { Button, Icon } from 'design-system';
import React from 'react';

export const Filters = () => {
  return (
    <div className="flex flex-col items-end gap-[27px]">
      <Button mode="secondary" className="w-[170px]" size="sm">
        <div className="flex items-center gap-2 font-medium">
          <span>درخواست گزارش</span>
          <Icon name="file-plus-2" />
        </div>
      </Button>
      <div className="flex w-full items-center justify-between">
        <span className="text-text-neutral-secondary text-lg font-semibold">
          فیلترها
        </span>
        <Button
          mode="secondary"
          size="sm"
          theme="error"
          className="w-[120px] font-medium"
        >
          حذف فیلترها
        </Button>
      </div>
    </div>
  );
};

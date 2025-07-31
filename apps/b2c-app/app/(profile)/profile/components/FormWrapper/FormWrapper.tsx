'use client';

import React from 'react';
import { TextField } from 'design-system';
import clsx from 'clsx';
import { FormSchemaType } from './FormWrapper.types';

interface FormWrapperProps {
  formSchema: FormSchemaType[];
  className?: string;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  formSchema,
  className,
}) => {
  return (
    <div
      className={clsx(
        'border-border-neutral-primary bg-surface-neutral-primary flex w-full flex-col gap-6 rounded-3xl border p-6',
        className,
      )}
    >
      <form className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {formSchema.map(({ name, label, value, icon }) => (
          <TextField
            key={name}
            className="w-[444px]"
            mergeTitleAndPlaceholder={false}
            mode="filled"
            type="text"
            trailingIcons={[]}
            leadingIcon={
              icon
                ? {
                    name: icon,
                    size: 'lg',
                    color: 'secondary',
                  }
                : undefined
            }
            label={label}
            placeholder=""
            value={value}
          />
        ))}
      </form>
    </div>
  );
};

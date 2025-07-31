'use client';

import React from 'react';
import { cn, TextField } from 'design-system';
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
      className={cn(
        'border-border-neutral-primary bg-surface-neutral-primary flex w-full flex-col gap-6 rounded-3xl border p-6',
        className,
      )}
    >
      <form className="grid w-full md:grid-cols-1 md:gap-6 lg:grid-cols-2">
        {formSchema.map(({ name, label, value, icon }) => (
          <TextField
            key={name}
            className="md:min-w-[360px] lg:min-w-[296px] xl:min-w-[364px]"
            mergeTitleAndPlaceholder={false}
            mode="filled"
            disabled={true}
            type="text"
            inputSize="default"
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

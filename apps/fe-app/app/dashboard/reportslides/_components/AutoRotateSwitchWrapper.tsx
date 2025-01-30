'use client';
import { AutoRotateSwitch } from 'design-system';
import React from 'react';

export const AutoRotateSwitchWrapper: React.FC = () => {
  return (
    <AutoRotateSwitch
      onChange={() => {}}
      rotateOptions={[5, 10, 15]}
      initialValue={null}
    />
  );
};

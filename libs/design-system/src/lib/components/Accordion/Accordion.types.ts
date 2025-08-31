import { ReactNode } from 'react';

export type AccordionItem = {
  // Custom trigger and content mode
  trigger?: ReactNode | ((isOpen: boolean) => ReactNode);
  content?: ReactNode;

  // Legacy mode (backward compatibility)
  title?: string;

  // Optional custom styling
  className?: string;

  // Optional custom behavior
  defaultOpen?: boolean;
};

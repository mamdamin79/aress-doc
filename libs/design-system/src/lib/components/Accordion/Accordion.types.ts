import { ReactNode } from 'react';

export type accordionPropsType = {
  items: AccordionItem[];
  singleOpen: boolean;
};

export type AccordionItem = {
  title: string;
  content: ReactNode;
};

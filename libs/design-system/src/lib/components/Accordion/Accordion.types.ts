import { ReactNode } from 'react';

export type accordionPropsType = {
  items: AccordionItem[];
  singleOpen: boolean;
};

type AccordionItem = {
  title: string;
  content: ReactNode;
};

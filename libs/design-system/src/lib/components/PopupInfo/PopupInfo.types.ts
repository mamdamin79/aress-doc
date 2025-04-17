import { AccordionItem } from "../Accordion/Accordion.types";
export interface CustomAccordionItemProps extends AccordionItem {
  link?: string;
}
export interface PopupInfoProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  itemsList: CustomAccordionItemProps[];
}

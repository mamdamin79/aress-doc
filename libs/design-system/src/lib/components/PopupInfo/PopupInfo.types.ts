import { AccordionItem } from "../Accordion/Accordion.types";
export interface customAccrodionItemProps extends AccordionItem {
  link?: string;
}
export interface PopupInfoProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  itemsList: customAccrodionItemProps[];
}

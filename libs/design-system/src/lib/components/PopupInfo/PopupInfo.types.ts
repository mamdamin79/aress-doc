import { AccordionItem } from "../Accordion/Accordion.types";

export interface PopupInfoProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  itemsList: AccordionItem[];
}

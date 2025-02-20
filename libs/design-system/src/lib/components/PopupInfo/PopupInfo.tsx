import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { customAccrodionItemProps, PopupInfoProps } from './PopupInfo.types';
import { Icon } from '../Icon';
import { Accordion } from '../Accordion';
import Link from 'next/link';

export const CustomAccrodionItem: React.FC<customAccrodionItemProps> = ({
  content,
  link,
}) => {
  return (
    <div className="flex flex-col gap-2 text-gray-600">
      <div>{content}</div>
      {link && (
        <Link
          href={link}
          className="flex flex-row items-center justify-end gap-2 text-left text-xs font-semibold"
        >
          مطالعه بیشتر
          <Icon name="arrow-up-left" size="sm" />
        </Link>
      )}
    </div>
  );
};
export const PopupInfo: React.FC<PopupInfoProps> = ({
  itemsList,
  title,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50 flex w-full justify-center"
    >
      <DialogPanel className="relative flex flex-col gap-2 rounded-3xl bg-gray-100 p-6 shadow-lg">
        <div
          className="absolute -left-2 -top-2 cursor-pointer"
          onClick={onClose}
        >
          <Icon name="CustomCirlcleX" size="lg_plus" />
        </div>
        <DialogTitle className="flex w-[600px] flex-row items-center gap-2 px-4 py-3 text-xl font-medium">
          <Icon name="book-open-text" />
          <span>{title}</span>
        </DialogTitle>
        <Description className="rounded-t-4 flex w-[600px] flex-col gap-4">
          <Accordion
            items={itemsList.map((item) => ({
              title: item.title,
              content: <CustomAccrodionItem {...item} />,
            }))}
            singleOpen={false}
          />
        </Description>
      </DialogPanel>
    </Dialog>
  );
};

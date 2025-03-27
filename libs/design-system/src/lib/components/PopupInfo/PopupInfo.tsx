import { CustomAccordionItemProps, PopupInfoProps } from './PopupInfo.types';
import { Icon } from '../Icon';
import { Accordion } from '../Accordion';
import Link from 'next/link';
import { Dialog } from '../Dialog';
import { POPUP_INFO_CONSTANTS } from './PopupInfo.constants';

export const CustomAccordionItem: React.FC<CustomAccordionItemProps> = ({
  content,
  link,
}) => {
  return (
    <div className="flex flex-col gap-2 text-gray-600">
      <div className="text-right">{content}</div>
      {link && (
        <Link
          href={link}
          className="flex flex-row items-center justify-end gap-2 text-left text-xs font-semibold"
        >
          {POPUP_INFO_CONSTANTS.READ_MORE_TEXT}
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
      onClose={onClose}
      isOpen={isOpen}
      aria-labelledby="popup-info-title"
    >
      <div className="flex flex-row items-center gap-2 px-4 py-3 text-xl font-medium">
        <Icon name="book-open-text" />
        <span id="popup-info-title">{title}</span>
      </div>
      <div className={`rounded-t-4 flex w-[600px] flex-col gap-4`}>
        <Accordion
          items={itemsList.map((item) => ({
            title: item.title,
            content: <CustomAccordionItem {...item} />,
          }))}
          singleOpen={false}
        />
      </div>
    </Dialog>
  );
};

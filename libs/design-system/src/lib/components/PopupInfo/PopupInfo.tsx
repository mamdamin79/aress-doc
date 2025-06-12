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
    <div className="flex flex-col gap-2 text-text-neutral-secondary">
      <div className="text-right">{content}</div>
      {link && (
        <div className='flex items-center justify-end'>
        <Link
        href={link}
        className="flex flex-row items-center w-fit gap-2 text-left text-xs font-semibold transition-colors hover:text-text-neutral-primary text-text-neutral-secondary hover:underline hover:underline-offset-8"
        >

          {POPUP_INFO_CONSTANTS.READ_MORE_TEXT}
          <Icon name="arrow-up-left" size="sm" />
        </Link>
            </div>
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
      className="bg-surface-neutral-secondary"
    >
      <div className="flex flex-row text-text-neutral-primary items-center gap-2 px-4 py-3 text-xl font-medium">
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

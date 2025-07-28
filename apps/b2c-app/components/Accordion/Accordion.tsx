import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Button, cn, FundsTag, Icon, TradableBadge } from 'design-system';
import { useState } from 'react';

interface AccordionItem {
  title: string;
  subTitle: string;
  accordionState: 'activity' | 'doc' | 'notification' | 'sesstion';
  status?: 'success' | 'error' | 'warning';
  logo?: string;
  links?: string[];
  date?: string;
  time?: string;
  location?: string;
  newNotification?: boolean;
  thisDevice?: boolean;
  children?: React.ReactNode;
}
interface Props {
  items: AccordionItem[];
}

export function Accordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return items.map((item, index) => (
    <Disclosure
      as="div"
      key={item.title}
      onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
      className={cn('bg-surface-neutral-background mt-5', {
        'hover:bg-surface-neutral-tertiary rounded-2xl p-3':
          item.accordionState === 'activity',
        'border-border-neutral-secondary hover:border-border-neutral-contrast border p-3 pl-6':
          item.accordionState === 'doc',
      })}
    >
      {({ open }) => (
        <>
          <DisclosureButton
            className={cn(
              'flex w-full cursor-default items-center justify-between',
              {
                'cursor-pointer': item.accordionState === 'activity',
              },
            )}
          >
            <div className="flex items-start gap-2 font-bold">
              <img
                className="h-8 w-8 rounded-full"
                src="https://www.k12digest.com/wp-content/uploads/2024/03/1-3-550x330.jpg"
                alt=""
              />
              <div className="flex h-full flex-col items-start justify-between">
                <span className="text-text-neutral-primary">{item.title}</span>
                <span className="text-text-neutral-secondary">
                  {item.subTitle}
                </span>
              </div>
            </div>
            {item.accordionState === 'activity' && (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end justify-between gap-1">
                  <span className="text-base font-bold">45,000,000 ریال</span>
                  {item.status === 'success' && (
                    <TradableBadge
                      theme="green"
                      haveIcon={true}
                      title="انجام شده"
                    />
                  )}
                </div>
                <span
                  className={`text-icon-neutral-primary transition-transform duration-300 ${
                    open && openIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  <Icon name="chevron-down" size="lg" />
                </span>
              </div>
            )}
            {item.accordionState === 'doc' && (
              <div className="flex items-center gap-6">
                {item.links?.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link}
                    className="text-text-neutral-primary w-fit"
                  >
                    <Button
                      className="w-fit"
                      align="center"
                      isLoading={false}
                      mode="underline"
                      size="md"
                      iconLeft={{ name: 'download' }}
                    >
                      دانلود
                    </Button>
                  </a>
                ))}
              </div>
            )}
            {item.accordionState === 'notification' && item.newNotification && (
              <FundsTag color="green" />
            )}
            {item.accordionState === 'sesstion' && (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end gap-1 text-base font-medium">
                  <div className="text-text-neutral-primary flex gap-1">
                    <span>{item.time}</span>|<span>{item.date}</span>
                  </div>
                  <span>{item.location}</span>
                </div>
                {item.thisDevice && (
                  <span className="text-icon-message-error-primary-600 cursor-pointer">
                    <Icon name="x" size="md" />
                  </span>
                )}
              </div>
            )}
          </DisclosureButton>

          {item.accordionState === 'activity' && openIndex === index && (
            <DisclosurePanel
              transition
              className="border-border-neutral-secondary text-text-neutral-secondary mt-4 border-t pt-4 text-sm duration-300 data-[closed]:-translate-y-6 data-[closed]:opacity-0"
            >
              {item.children}
            </DisclosurePanel>
          )}
        </>
      )}
    </Disclosure>
  ));
}

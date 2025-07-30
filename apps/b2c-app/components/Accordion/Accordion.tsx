import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Button, cn, FundsTag, Icon, TradableBadge } from 'design-system';
import { useState } from 'react';

interface AccordionItem {
  title: string;
  subTitle?: string;
  type: 'activity' | 'doc' | 'notification' | 'sesstion' | 'default';
  status?: 'success' | 'error' | 'warning';
  logo?: string;
  links?: string[];
  date?: string;
  time?: string;
  location?: string;
  newNotification?: boolean;
  thisDevice?: boolean;
  children?: React.ReactNode;
  price?: number;
}
interface Props {
  className?: string;
  items: AccordionItem[];
  singleOpen: boolean;
}

export function Accordion({ items, singleOpen, className }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return items.map((item, index) => {
    return (
      <Disclosure
        as="div"
        key={`accordion-item-${index}`}
        onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
        className={cn(
          'bg-surface-neutral-background',
          {
            'hover:bg-surface-neutral-tertiary cursor-pointer rounded-2xl':
              item.type === 'activity',
            'border-border-neutral-secondary hover:border-border-neutral-contrast border':
              item.type === 'doc',
            'cursor-pointer': item.type === 'default',
          },
          className,
        )}
      >
        {({ open }) => (
          <>
            {singleOpen && open ? (
              <div
                className={cn(
                  'group flex w-full cursor-default items-center justify-between',
                  {
                    'cursor-pointer py-3': item.type === 'activity',
                    'cursor-pointer py-4': item.type === 'default',
                    'p-3 pl-6': item.type === 'doc',
                  },
                )}
              >
                <div className="flex items-start gap-2 font-bold">
                  {item.logo && (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={item.logo}
                      alt=""
                    />
                  )}
                  <div className="flex h-full flex-col items-start justify-between">
                    <span
                      className={cn('text-text-neutral-primary', {
                        'group-hover:text-text-brand-primary-600 duration-200':
                          item.type === 'default',
                      })}
                    >
                      {item.title}
                    </span>
                    <span className="text-text-neutral-secondary">
                      {item.subTitle}
                    </span>
                  </div>
                </div>
                {(item.type === 'activity' || item.type === 'default') && (
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end justify-between gap-1">
                      {item.price && (
                        <span className="text-base font-bold">
                          {item.price} ریال
                        </span>
                      )}
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
                {item.type === 'doc' && (
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
                {item.type === 'notification' && item.newNotification && (
                  <FundsTag color="green" />
                )}
                {item.type === 'sesstion' && (
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
              </div>
            ) : (
              <DisclosureButton
                className={cn(
                  'group flex w-full cursor-default items-center justify-between',
                  {
                    'cursor-pointer py-3': item.type === 'activity',
                    'cursor-pointer py-4': item.type === 'default',
                    'p-3 pl-6': item.type === 'doc',
                  },
                )}
              >
                <div className="flex items-start gap-2 font-bold">
                  {item.logo && (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={item.logo}
                      alt=""
                    />
                  )}
                  <div className="flex h-full flex-col items-start justify-between">
                    <span
                      className={cn('text-text-neutral-primary', {
                        'group-hover:text-text-brand-primary-600 duration-200':
                          item.type === 'default',
                      })}
                    >
                      {item.title}
                    </span>
                    <span className="text-text-neutral-secondary">
                      {item.subTitle}
                    </span>
                  </div>
                </div>
                {(item.type === 'activity' || item.type === 'default') && (
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end justify-between gap-1">
                      {item.price && (
                        <span className="text-base font-bold">
                          {item.price} ریال
                        </span>
                      )}
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
                {item.type === 'doc' && (
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
                {item.type === 'notification' && item.newNotification && (
                  <FundsTag color="green" />
                )}
                {item.type === 'sesstion' && (
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
            )}
            {singleOpen ? (
              openIndex === index && (
                <DisclosurePanel
                  transition
                  className="text-text-neutral-secondary mt-4 pb-4 pt-1 text-sm duration-300 data-[closed]:-translate-y-6 data-[closed]:opacity-0"
                >
                  {item.children}
                </DisclosurePanel>
              )
            ) : (
              <DisclosurePanel
                transition
                className="text-text-neutral-secondary mt-4 pb-4 pt-1 text-sm duration-300 data-[closed]:-translate-y-6 data-[closed]:opacity-0"
              >
                {item.children}
              </DisclosurePanel>
            )}
          </>
        )}
      </Disclosure>
    );
  });
}

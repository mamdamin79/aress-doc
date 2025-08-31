'use client';
import React from 'react';
import { activitiesData } from '../../_components/Activities/data';
import { ActivitiesAccordionHead } from '../../_components/Activities/ActivitiesAccordionHead';
import { Accordion } from 'design-system';
import {
  AccordionContentBuy,
  AccordionContentDeposit,
  AccordionContentDividend,
  AccordionContentSell,
  AccordionContentWithdraw,
} from './AccordionContent';

export const Activities: React.FC = () => {
  return (
    <>
      {activitiesData.map((activitySection) => {
        return (
          <div className="flex flex-col gap-3" key={activitySection.date}>
            <span className="text-text-neutral-secondary text-lg font-semibold">
              {activitySection.date}
            </span>
            {activitySection.activities.map((activity, index) => {
              return (
                <React.Fragment key={`${activity.title} - ${index}`}>
                  <Accordion
                    className="-my-4 space-y-0"
                    items={[
                      {
                        trigger(isOpen) {
                          return (
                            <ActivitiesAccordionHead
                              {...activity}
                              isOpen={isOpen}
                            />
                          );
                        },
                        content:
                          activity.type === 'ONLINE_DEPOSIT' ? (
                            <AccordionContentDeposit paymentMethod="درگاه بانکی" />
                          ) : activity.type === 'SLIP_DEPOSIT' ? (
                            <AccordionContentDeposit paymentMethod="فیش بانکی" />
                          ) : activity.type === 'ADJUSTMENT' ? (
                            <AccordionContentWithdraw
                              requestMethod="توسط صندوق"
                              status="completed"
                            />
                          ) : activity.type === 'WITHDRAW' ? (
                            <AccordionContentWithdraw
                              requestMethod="توسط مشتری"
                              status="completed"
                            />
                          ) : activity.type === 'DIVIDEND' ? (
                            <AccordionContentDividend />
                          ) : activity.type === 'BUY' ? (
                            <AccordionContentBuy />
                          ) : (
                            <AccordionContentSell />
                          ),
                      },
                    ]}
                  />
                  <div className="border-border-neutral-tertiary w-full border"></div>
                </React.Fragment>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

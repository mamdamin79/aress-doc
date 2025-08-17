import React from 'react';
import { DocContainer } from './_components/DocContainer';
import { documentsData } from './_components/data';
import { Filters } from './_components/Filters';
import { SidebarWrapper } from './_components/SidebarWrapper';

export default function DocsPage() {
  return (
    <div className="relative flex max-w-full flex-row justify-center">
      <div className="flex w-full max-w-[1680px] flex-row gap-8 px-8 pb-8 pt-8 xl:px-20">
        <div className="flex w-full flex-col gap-8 text-right">
          <h1 className="text-text-neutral-primary text-xl font-semibold">
            مستندات
          </h1>
          {documentsData.map((document) => {
            return (
              <div className="flex flex-col gap-3" key={document.date}>
                <span className="text-text-neutral-secondary text-lg font-semibold">
                  {document.date}
                </span>
                {document.documents.map((doc) => (
                  <DocContainer key={doc.title} {...doc} />
                ))}
              </div>
            );
          })}
        </div>
        <div className="hidden w-[356px] min-w-[356px] shrink-0 flex-col gap-6 lg:flex xl:w-[456px] xl:min-w-[456px]">
          <Filters />
        </div>
      </div>

      <SidebarWrapper />
    </div>
  );
}

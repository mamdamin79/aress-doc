import React from 'react';
import { DocContainer } from './_components';
import { documentsData } from './_components/data';
import { Filters } from './_components/Filters';
export default function DocsPage() {
  return (
    <div className="flex max-w-[1680px] flex-row gap-8 px-20 pb-8 pt-8">
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
      <div className="flex w-[416px] min-w-[416px] shrink-0 flex-col gap-6">
        <Filters />
      </div>
    </div>
  );
}

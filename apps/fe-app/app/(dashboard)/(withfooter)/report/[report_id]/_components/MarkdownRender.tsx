import React from 'react';
import Markdown from 'react-markdown';

export const MarkdownRender = ({markdown}: {markdown:string}) => {
  return  <Markdown
  components={{
    // Custom renderer for the ul element
    ul: ({ node, ...props }) => (
      <ul
        className="rtl marker:text-brand-600 list-disc text-right marker:text-3xl"
        {...props}
      />
    ),
    // Custom renderer for h1 (titles)
    h1: ({ node, ...props }) => (
      <div className="before:bg-brand-600 relative pr-4 before:absolute before:bottom-3.5 before:right-0 before:h-2 before:w-2 before:rounded-full before:content-['']">
        <h1
          className="pt-10 text-right text-xl font-medium"
          {...props}
        />
      </div>
    ),
    // Custom renderer for h2 (subtitles)

    h2: ({ node, ...props }) => (
      <h2 className="text-right text-lg font-medium" {...props} />
    ),
    // Custom renderer for paragraphs
    p: ({ node, ...props }) => (
      <p
        className="text-md mt-4 text-right font-normal leading-relaxed text-gray-600"
        {...props}
      />
    ),
    // ** strong **
    strong: ({ node, ...props }) => (
      <strong className="text-lg font-medium text-black" {...props} />
    ),
    // Custom renderer for ordered lists
    ol: ({ node, ...props }) => (
      <ol
        className="list-decimal pr-2.5 text-right text-lg font-medium leading-relaxed"
        {...props}
      />
    ),
    // Custom renderer for list items
    li: ({ node, ...props }) => (
      <li className="text-right" {...props} />
    ),
  }}
>
  {markdown}
</Markdown>;
};
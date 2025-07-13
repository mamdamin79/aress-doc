import React from 'react';
import ReactDOMServer from 'react-dom/server';
import type Highcharts from 'highcharts';

// Generic label renderer
export const LegendLabel = () =>({
  primary,
  secondary,
  fontSize,
}: {
  primary: string;
  secondary: string;
  fontSize?: string;
}) => {
  return (
    <>
      {primary}{' '}
      <span
        style={{
          color: 'var(--color-text-neutral-secondary)',
          fontSize: fontSize ?? undefined,
        }}
      >
        ({secondary})
      </span>
    </>
  );
}
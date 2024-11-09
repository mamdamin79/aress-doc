import React, { useState, useEffect } from 'react';

export interface WithTableHOCProps {
  hoveredRow: number | null;
  setHoveredRow: React.Dispatch<React.SetStateAction<number | null>>;

  hoveredCol: number | null;
  setHoveredCol: React.Dispatch<React.SetStateAction<number | null>>;

  matchingRow: number | null;
  setMatchingRow: React.Dispatch<React.SetStateAction<number | null>>;

  matchingCol: number | null;
  setMatchingCol: React.Dispatch<React.SetStateAction<number | null>>;

  renderHeadersOnHover?: (row?: number, col?: number) => string;
}

export const withTableHOC = <P extends WithTableHOCProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [hoveredCol, setHoveredCol] = useState<number | null>(null);
    const [matchingRow, setMatchingRow] = useState<number | null>(null);
    const [matchingCol, setMatchingCol] = useState<number | null>(null);

    const renderHeadersOnHover = (row?: number, col?: number): string => {
      if (row !== undefined) {
        if (hoveredRow !== null && hoveredRow !== row) return 'text-gray-600';
        else if (
          hoveredRow !== null ||
          (matchingRow !== null && matchingRow === row)
        )
          return 'bg-blue-600  text-baseBackground ';
      } else {
        if (hoveredCol !== null && hoveredCol !== col) return 'text-gray-600';
        else if (
          hoveredCol !== null ||
          (matchingCol !== null && matchingCol === col)
        )
          return 'bg-blue-600 text-baseBackground ';
      }
      return '';
    };

    return (
      <WrappedComponent
        {...props}
        hoveredRow={hoveredRow}
        setHoveredRow={setHoveredRow}
        hoveredCol={hoveredCol}
        setHoveredCol={setHoveredCol}
        matchingRow={matchingRow}
        setMatchingRow={setMatchingRow}
        matchingCol={matchingCol}
        setMatchingCol={setMatchingCol}
        renderHeadersOnHover={renderHeadersOnHover}
      />
    );
  };
};

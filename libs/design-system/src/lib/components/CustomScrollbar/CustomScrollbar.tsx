import React from 'react';

export const CustomScrollbar: React.FC = () => {
  return (
    <div className="scrollbar scrollbar-thumb-red-700 scrollbar-thumb-rounded-full scrollbar-track-red-300 h-32 overflow-y-scroll">
      <div className="h-64 bg-slate-400"></div>
    </div>
  );
};

import React from 'react';
export interface DashboardNumberAndNameProps {
  number: number;
  title: string;
}
export const DashboardNumberAndName: React.FC<DashboardNumberAndNameProps> = ({
  number,
  title,
}) => {
  return (
    <span className="text-md flex h-10 w-fit items-center gap-2 rounded-br-2xl rounded-tl-2xl border-2 border-gray-100 px-2 font-normal shadow-2xl">
      <span>داشبورد {number}:</span>
      <span className="font-medium">{title}</span>
    </span>
  );
};

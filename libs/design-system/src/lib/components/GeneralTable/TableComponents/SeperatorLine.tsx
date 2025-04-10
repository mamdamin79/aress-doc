import React from 'react';
interface SeperatorLineProps {
    colSpan:number;
    label?:string;
}
export const SeperatorLine: React.FC<SeperatorLineProps> = ({colSpan,label, ...rest}) => {
  return (
    <tr {...rest}>
      <td colSpan={colSpan} className="font-semibold">
        <div className="bg-gray-200 h-[1px] mt-3"></div>
        {label ?? ''}
      </td>
    </tr>
  );
};

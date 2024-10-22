import { X } from 'lucide-react';
import { Icon } from '../Icon';

interface Props {
  label: string;
  onClose: (item: unknown) => void;
  item: unknown;
}

export function RemovableLabel({ label, onClose, item }: Props) {
  return (
    <div className="bg-gray-100 cursor-pointer w-fit group font-vazirmatn rounded-sm p-1 flex items-center justify-center gap-1">
      <button
        onClick={() => onClose(item)}
        className="text-gray-600 w-5 h-5 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white duration-300 border-2 border-gray-600 rounded-[4px]"
      >
        <X strokeWidth={4} width={12} />
      </button>
      <span className="text-sm text-black">{label}</span>
    </div>
  );
}

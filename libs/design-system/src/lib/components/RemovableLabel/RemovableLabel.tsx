import { X } from 'lucide-react';

interface Props {
  label: string;
  onClose: (item: unknown) => void;
  item: unknown;
}

export function RemovableLabel({ label, onClose, item }: Props) {
  return (
    <div className="font-vazirmatn group flex w-fit cursor-pointer items-center justify-center gap-1.5 rounded-sm bg-gray-100 py-1 pl-1.5 pr-2">
      <span className="text-sm text-black">{label}</span>
      <button
        onClick={() => onClose(item)}
        className="flex h-5 w-5 items-center justify-center rounded-[4px] border-2 border-gray-600 text-gray-600 duration-300 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white"
      >
        <X strokeWidth={4} width={12} />
      </button>
    </div>
  );
}

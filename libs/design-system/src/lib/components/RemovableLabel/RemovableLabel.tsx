import { X } from 'lucide-react';

interface Props {
  label: string;
  onClose: (item: unknown) => void;
  item: unknown;
}

export function RemovableLabel({ label, onClose, item }: Props) {
  return (
    <div className="bg-surface-neutral-secondary group flex w-fit cursor-pointer items-center justify-center gap-1.5 rounded-sm py-1 pl-1.5 pr-2">
      <span className="text-text-neutral-primary text-sm">{label}</span>
      <button
        onClick={() => onClose(item)}
        className="border-icon-neutral-secondary text-icon-neutral-secondary group-hover:text-text-onmessage-neutral-primary-on600 group-hover:border-icon-message-error-primary-600 group-hover:bg-surface-accent-red-600 flex h-5 w-5 items-center justify-center rounded-[4px] border-2 px-0 duration-300"
      >
        <X strokeWidth={4} width={12} />
      </button>
    </div>
  );
}

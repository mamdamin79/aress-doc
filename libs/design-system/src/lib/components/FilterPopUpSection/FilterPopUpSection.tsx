import { useState } from 'react';
import { Icon } from '../Icon';
import { RemovableLabel } from '../RemovableLabel';
import { Checkbox } from '../Checkbox';

interface Prop {
  name: string;
  options: string[];
  selectedOptons: SelectedColumnsType;
  handlerOptonToggle: (item: string) => void;
  reset: () => void;
}

type SelectedColumnsType = {
  [key: string]: boolean;
};

export function FilterPopUpSection({ name, options, selectedOptons, handlerOptonToggle, reset }: Prop) {
  const [showOptions, setShowOptions] = useState(false);

  

  return !showOptions ? (
    <div className="rounded-xl border border-gray-300 px-4 py-3">
      <div className="flex items-center justify-between pb-2">
        {name}
        <div className="flex cursor-pointer items-center gap-1 text-2xl">
          {Object.values(selectedOptons).filter(Boolean).length ? (
            <div onClick={reset}>
              <Icon name="x" size="lg" />
            </div>
          ) : (
            ''
          )}
          <div onClick={() => setShowOptions(true)}>
            <Icon name="chevron-left" size="lg" />
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-wrap gap-2 pt-3">
        {options.map(
          (item) =>
            selectedOptons[item] && (
              <RemovableLabel
                label={item}
                onClose={() => handlerOptonToggle(item)}
                item={item}
              />
            ),
        )}
      </div>
    </div>
  ) : (
    <div className='absolute right-0 top-0 h-full w-full bg-white px-4'>
      <div className="flex items-center gap-1 pb-2">
        <span
          onClick={() => setShowOptions(false)}
          className="cursor-pointer text-2xl"
        >
          <Icon name="chevron-right" size="lg" />
        </span>
        <span>{name}</span>
      </div>
      <hr />
      <div className="flex flex-col gap-3 py-3">
        {options.map((item) => (
          <Checkbox
            onChange={() => handlerOptonToggle(item)}
            checked={!!selectedOptons[item]}
            content={item}
          />
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Icon } from '../Icon';
import { RemovableLabel } from '../RemovableLabel';
import { Checkbox } from '../Checkbox';

interface Prop {
  name: string;
  options: string[];
  onClear?: () => void;
}

type SelectedColumnsType = {
  [key: string]: boolean;
};

export function FilterPopUpSection({ name, options, onClear }: Prop) {
  const [selectedOption, setSelectedOption] = useState<SelectedColumnsType>({});
  const [showOptions, setShowOptions] = useState(false);

  const handlerOptionsChecked = (option: string) => {
    setSelectedOption((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return !showOptions ? (
    <div className="rounded-xl border border-gray-300 px-4 py-3">
      <div className="flex items-center justify-between pb-2">
        {name}
        <div className="flex cursor-pointer items-center gap-1 text-2xl">
          {Object.values(selectedOption).filter(Boolean).length ? (
            <div onClick={() => setSelectedOption({})}>
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
            selectedOption[item] && (
              <RemovableLabel
                label={item}
                onClose={() => handlerOptionsChecked(item)}
                item={item}
              />
            ),
        )}
      </div>
    </div>
  ) : (
    <div>
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
            onChange={() => handlerOptionsChecked(item)}
            checked={!!selectedOption[item]}
            content={item}
          />
        ))}
      </div>
    </div>
  );
}

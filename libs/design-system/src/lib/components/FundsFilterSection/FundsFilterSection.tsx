import { Checkbox } from '../Checkbox';

interface SelectedColumnsType {
  [key: string]: boolean;
}

interface Props {
  title: string;
  options: string[];
  selectedColumns: SelectedColumnsType;
  onToggle: (section: string, option: string) => void;
}

export const FundsFilterSection: React.FC<Props> = ({
  title,
  options,
  selectedColumns,
  onToggle,
}) => {
  return (
    <div className="mb-2 rounded-md p-2">
      <span className="text-base font-semibold">{title}:</span>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {options.map((option) => (
          <div
            key={option}
            className="hover:bg-brand-100 flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2"
          >
            <Checkbox
              checked={!!selectedColumns[option]}
              onChange={() => onToggle(title, option)}
              content={option}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

import { Icon } from '../Icon';

interface AddReportButtonProps {
  onClick: () => void;
}
export const AddReportButton: React.FC<AddReportButtonProps> = ({
  onClick,
}) => {
  return (
    <div className="shadow-6xl flex h-[336px] w-[616px] items-center justify-center rounded-2xl border-2 border-gray-200 bg-white text-lg font-medium text-gray-600">
      <button
        onClick={onClick}
        className="group/reportBtn flex flex-col items-center justify-center gap-4 transition-colors"
      >
        <div className="group-hover/reportBtn:text-brand-700 group-hover/reportBtn:border-brand-700 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-dashed border-gray-500 transition-all group-hover/reportBtn:border-solid">
          <Icon name="plus" size="lg" />
        </div>
        <span className="group-hover/reportBtn:text-brand-700 text-center">
          افزودن گزارش جدید
        </span>
      </button>
    </div>
  );
};

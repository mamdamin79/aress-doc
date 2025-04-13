import { Icon } from '../Icon';

interface AddReportButtonProps {
  onClick: () => void;
}
export const AddReportButton: React.FC<AddReportButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      className="w-[616px] h-[336px] flex justify-center items-center bg-white rounded-2xl shadow-sm  text-gray-600 text-lg font-medium group/reportBtn hover:text-brand-700"
      onClick={onClick}
    >
      <div className="flex flex-col gap-4 justify-center items-center transition-all">
        <div className="w-[72px] h-[72px] rounded-full border-2 border-dashed border-gray-500 group-hover/reportBtn:border-brand-700  transition-all group-hover/reportBtn:border-solid flex justify-center items-center">
          <Icon name="plus" size="lg" />
        </div>
        <span className="text-center">افزودن گزارش جدید</span>
      </div>
    </button>
  );
};

import { Icon } from '../Icon';

interface AddReportButtonProps {
  onClick: () => void;
}
export const AddReportButton: React.FC<AddReportButtonProps> = ({
  onClick,
}) => {
  return (
    <div
      className="w-[616px] h-[320px] flex justify-center items-center bg-white rounded-2xl shadow-sm  text-gray-600 text-lg font-medium group hover:text-brand-700"
      onClick={onClick}
    >
      <div className="flex flex-col gap-4 justify-center items-center transition-all">
        <div className="w-[72px] h-[72px] rounded-full border-2 border-dashed border-gray-500 group-hover:border-brand-700 flex justify-center items-center">
          <Icon name="plus" key={'plus'} size="lg_plus_plus" />
        </div>
        <span className="text-center">افزودن گزارش جدید</span>
      </div>
    </div>
  );
};

import { Icon } from '../Icon';

interface AddReportButtonProps {
  onClick: () => void;
  variant?: 'add' | 'place';
}
export const AddReportButton: React.FC<AddReportButtonProps> = ({
  onClick,
  variant = 'add',
}) => {
  return (
    <div className="shadow-6xl bg-surface-neutral-primary border-border-neutral-secondary text-text-neutral-secondary flex h-[336px] w-[616px] items-center justify-center rounded-2xl border-2 text-lg font-medium">
      <button
        onClick={onClick}
        className="group/reportBtn flex w-fit flex-col items-center justify-center gap-4 transition-colors"
      >
        <div className="group-hover/reportBtn:text-text-brand-contrast-700 group-hover/reportBtn:border-border-brand-primary-600 border-border-neutral-highcontrast flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-dashed transition-all group-hover/reportBtn:border-solid">
          <Icon name={variant === 'add' ? 'plus' : 'arrow-down'} size="lg" />
        </div>
        <span className="group-hover/reportBtn:text-text-brand-contrast-700 text-center">
          {variant === 'add' ? 'افزودن گزارش جدید' : 'جایگذاری در این فضا'}
        </span>
      </button>
    </div>
  );
};

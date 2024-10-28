import { Icon } from '../IconComponent';

export function CircleXIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center cursor-pointer">
      <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
        <Icon name="x" size="sm" />
      </div>
    </div>
  );
}

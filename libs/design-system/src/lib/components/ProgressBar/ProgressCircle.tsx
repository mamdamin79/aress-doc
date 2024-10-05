interface Props {
  mode: 'active' | 'passed' | 'inactive';
}

export function ProgressCircle({ mode }: Props) {
  return (
    <div>
      {mode === 'active' ? (
        <div className="w-8 h-8 absolute -top-3 bg-brand-300 flex items-center justify-center rounded-full">
          <div className="rounded-full bg-white border-brand-600 flex items-center justify-center border-2 w-6 h-6">
            <div className="w-2.5 h-2.5 bg-brand-600 rounded-full"></div>
          </div>
        </div>
      ) : mode === 'inactive' ? (
        <div className="w-6 h-6 absolute -top-2 bg-brand-600 rounded-full flex items-center justify-center">
          <div className="rounded-full bg-white w-2.5 h-2.5"></div>
        </div>
      ) : (
        <div className="rounded-full absolute -top-2 flex items-center justify-center bg-white w-6 h-6 border-gray-300 border-2">
          <div className="bg-gray-200 rounded-full w-2.5 h-2.5"></div>
        </div>
      )}
    </div>
  );
}

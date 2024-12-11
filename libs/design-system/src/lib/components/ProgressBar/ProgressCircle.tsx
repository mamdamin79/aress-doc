interface Props {
  mode: 'active' | 'passed' | 'inactive';
}

export function ProgressCircle({ mode }: Props) {
  if (mode === 'active')
    return (
      <div className="bg-brand-300 absolute -top-5 flex h-8 w-8 items-center justify-center rounded-full">
        <div className="border-brand-600 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white">
          <div className="bg-brand-600 h-2.5 w-2.5 rounded-full"></div>
        </div>
      </div>
    );

  if (mode === 'inactive')
    return (
      <div className="bg-brand-600 absolute -top-4 flex h-6 w-6 items-center justify-center rounded-full">
        <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
      </div>
    );

  if (mode === 'passed')
    return (
      <div className="absolute -top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
        <div className="h-2.5 w-2.5 rounded-full bg-gray-200"></div>
      </div>
    );
}

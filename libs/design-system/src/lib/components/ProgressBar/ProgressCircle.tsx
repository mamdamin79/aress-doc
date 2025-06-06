interface Props {
  mode: 'active' | 'passed' | 'inactive';
}

export function ProgressCircle({ mode }: Props) {
  if (mode === 'active')
    return (
      <div className="bg-surface-brand-300-disable absolute -top-5 flex h-8 w-8 items-center justify-center rounded-full">
        <div className="border-border-brand-primary-600 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-surface-neutral-background">
          <div className="bg-surface-brand-600-primary h-2.5 w-2.5 rounded-full" />
        </div>
      </div>
    );

  if (mode === 'inactive')
    return (
      <div className="bg-surface-brand-600-primary absolute -top-4 flex h-6 w-6 items-center justify-center rounded-full">
        <div className="h-2.5 w-2.5 rounded-full bg-surface-neutral-background" />
      </div>
    );

  if (mode === 'passed')
    return (
      <div className="absolute -top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-border-neutral-primary bg-surface-neutral-background">
        <div className="h-2.5 w-2.5 rounded-full bg-surface-accent-gray-300" />
      </div>
    );
}

import { useEffect, useState } from 'react';

export const LoadingSpinner = ({ duration }: { duration: number }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalSteps = 100; // Number of steps to complete the progress (100%)
    const intervalTime = (duration * 1000) / totalSteps; // Convert duration to milliseconds and divide by steps

    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      setProgress(start);
      if (start >= totalSteps) clearInterval(interval);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [duration]); // Re-run effect if duration changes

  return (
    <div className="relative h-12 w-12">
      <div
        className="border-baseBackground absolute inset-0 rounded-full border-4"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, #99D5D5 0deg, #008483 ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`,
          maskImage: 'radial-gradient(circle, transparent 45%, black 46%)',
          WebkitMaskImage:
            'radial-gradient(circle, transparent 45%, black 46%)',
          transition: 'background 0.1s linear',
        }}
      />
    </div>
  );
};

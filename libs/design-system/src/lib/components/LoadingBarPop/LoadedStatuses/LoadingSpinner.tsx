'use client'
import { useEffect, useState, useRef } from 'react';

export const LoadingSpinner = ({ duration }: { duration: number }) => {
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    const totalSteps = 100;
    const totalDuration = duration * 1000;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const currentProgress = Math.min(
        Math.floor((elapsed / totalDuration) * totalSteps),
        totalSteps,
      );

      setProgress(currentProgress);

      if (currentProgress < totalSteps) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [duration]);
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

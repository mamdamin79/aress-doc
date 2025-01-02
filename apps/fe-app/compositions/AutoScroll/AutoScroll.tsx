'use client';
import { AutoRotateSwitch, HorizontalScrollBar } from 'design-system';
import React, { useEffect, useState } from 'react';

export const AutoScroll: React.FC = () => {
  const [autoRotateTime, setAutoRotateTime] = useState(5000);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(
    autoRotateTime !== null,
  );

  useEffect(() => {
    setAutoRotateEnabled(autoRotateTime !== null);
  }, [autoRotateTime]);
  const activateRotate = (time: number) => {
    setAutoRotateTime(time * 1000);
    setAutoRotateEnabled(true);
  };
  const barsNumber = 3;
  return (
    <div className="relative flex flex-col items-center justify-center gap-4">
      <HorizontalScrollBar
        autoRotate={autoRotateEnabled}
        autoRotateDuration={autoRotateEnabled ? autoRotateTime : 0}
        barsNumber={2}
        onChangeIndex={(index) => {
          console.log(index);
        }}
      />
      <div
        className="fixed"
        style={{
          top: barsNumber - 1 * 25 + 130 + 'px',
        }}
      >
        <AutoRotateSwitch
          onChange={(value) =>
            value !== null ? activateRotate(value) : setAutoRotateEnabled(false)
          }
          rotateOptions={[5, 10, 15]}
          initialValue={5}
        />
      </div>
    </div>
  );
};

import { ProgressBarItem } from './ProgressBar.types';

interface Props {
  progressBarItems: ProgressBarItem[];
  activeIndex: number;
}

export function ProgressBar({ progressBarItems, activeIndex }: Props) {
  return (
    <div className="relative flex mx-auto items-start justify-between">
      {activeIndex < progressBarItems.length &&
        activeIndex >= 0 &&
        progressBarItems.map((item: ProgressBarItem, index: number) => (
          <div
            className={`${
              index === progressBarItems.length - 1 ? 'w-full' : 'w-full'
            } relative flex flex-col justify-center items-center`}
            key={index}
          >
            {/* render icon Progressbar */}
            <div className="">
              {activeIndex === index ? (
                <div className="w-8 h-8 absolute -top-3 bg-brand-300 flex items-center justify-center rounded-full">
                  <div className="rounded-full bg-white border-brand-600 flex items-center justify-center border-2 w-6 h-6">
                    <div className="w-2.5 h-2.5 bg-brand-600 rounded-full"></div>
                  </div>
                </div>
              ) : activeIndex > index ? (
                <div className="w-6 h-6 absolute -top-2 bg-brand-600 rounded-full flex items-center justify-center">
                  <div className="rounded-full bg-white w-2.5 h-2.5"></div>
                </div>
              ) : (
                <div className="rounded-full absolute -top-2 flex items-center justify-center bg-white w-6 h-6 border-gray-300 border-2">
                  <div className="bg-gray-200 rounded-full w-2.5 h-2.5"></div>
                </div>
              )}
            </div>
            {index + 1 < progressBarItems.length && (
              <div
                className={`w-full -z-50 overflow-hidden relative h-2 mr-[100%] `}
              >
                <div className={`w-full h-full bg-gray-200 absolute`}></div>
                <div
                  className={`w-full h-full absolute ${
                    activeIndex > index && 'bg-brand-600 animate-progressBar'
                  }`}
                ></div>
              </div>
            )}
            <p className="mt-3">{item}</p>
          </div>
        ))}
    </div>
  );
}

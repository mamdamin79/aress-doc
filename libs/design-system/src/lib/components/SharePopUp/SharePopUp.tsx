import React, { useState } from 'react';
import { Icon } from '../Icon';
import instagramIcon from '../../../assets/icons/instagram.svg';
import whatsappIcon from '../../../assets/icons/whatsapp.svg';
import telegramIcon from '../../../assets/icons/telegram.svg';
import linkedinIcon from '../../../assets/icons/linkedin.svg';
import emailIcon from '../../../assets/icons/email.svg';
import { Button } from '../Button';

export interface SharePopUpProps {
  url: string;
  message: string;
}

export const SharePopUp = ({ url, message }: SharePopUpProps) => {
  const platforms = [
    { name: 'Instagram', icon: instagramIcon, link: 'https://google.com' },
    { name: 'Telegram', icon: telegramIcon, link: 'https://google.com' },
    { name: 'WhatsApp', icon: whatsappIcon, link: 'https://google.com' },
    { name: 'Linkedin', icon: linkedinIcon, link: 'https://google.com' },
    { name: 'Email', icon: emailIcon, link: 'https://google.com' },
    { name: 'Sample 1', icon: emailIcon, link: 'https://google.com' },
    { name: 'Sample 2', icon: emailIcon, link: 'https://google.com' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visiblePlatforms = platforms.slice(currentIndex, currentIndex + 5);

  const goRight = () => setCurrentIndex(0); // Scroll all the way right
  const goLeft = () => setCurrentIndex(platforms.length - 2); // Scroll all the way left

  return (
    <div className="relative rounded-3xl p-6 flex justify-center items-center gap-4 flex-col w-[440px] h-fit shadow-lg">
      {/* Close button */}
      <div className="absolute top-0 left-0 -mt-2 -ml-2 w-8 h-8 bg-brand-600 rounded-full flex justify-center items-center shadow-sm">
        <button
          className="bg-white rounded-full shadow-lg w-6 h-6 flex justify-center items-center"
          aria-label="Close"
        >
          <Icon name="x" key="x" size="md" />
        </button>
      </div>

      <h2 className="text-xl font-semibold">اشتراک گذاری</h2>
      <div className="flex flex-col gap-3 w-full">
        <p className="text-right text-sm text-gray-600 font-semibold">
          ارسال لینک به:
        </p>
        <div className="flex items-center gap-2">
          {currentIndex > 0 && (
            <button
              onClick={goRight}
              className="z-10 bg-baseBackground p-1 text-brand-600 border-2 border-brand-600 rounded-full shadow-3xl absolute top-1/2 transform -translate-y-1/2 -mt-2 right-2"
            >
              <Icon name="chevron-right" size="md" />
            </button>
          )}
          <div className="flex justify-center gap-6 p-2">
            {visiblePlatforms.map((platform, index) => (
              <a
                className="flex flex-col items-center text-xs gap-2"
                key={index}
                href={platform.link}
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <img src={platform.icon.src} alt={platform.name} />
                </div>
                <span className="font-semibold">{platform.name}</span>
              </a>
            ))}
          </div>
          {/*Left arrow button, only visible if there's more to the Left */}
          {currentIndex + 5 < platforms.length && (
            <button
              onClick={goLeft}
              className="z-10 bg-baseBackground p-1 text-brand-600 border-2 border-brand-600 rounded-full shadow-3xl absolute top-1/2 transform -translate-y-1/2 -mt-2 left-2"
            >
              <Icon name="chevron-left" size="md" />
            </button>
          )}
        </div>
      </div>

      <div className="w-full h-fit rounded-xl p-2 gap-2 flex flex-row justify-between border-[2px] border-gray-300">
        <div className="text-nowrap w-28">
          <Button
            onClick={() => navigator.clipboard.writeText(url)}
            align="center"
            isLoading={false}
            mode="primary"
            size="md"
          >
            {' '}
            کپی لینک
          </Button>
        </div>

        <input
          type="text"
          readOnly
          value={`...${url.slice(0, 37)}`}
          className="font-semibold text-sm outline-none w-full text-left ltr"
        />
      </div>
    </div>
  );
};

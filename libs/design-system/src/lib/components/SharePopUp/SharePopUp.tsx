import React, { useState } from 'react';
import { Icon } from '../Icon';
import instagramIcon from '../../../assets/icons/instagram.svg';
import whatsappIcon from '../../../assets/icons/whatsapp.svg';
import telegramIcon from '../../../assets/icons/telegram.svg';
import linkedinIcon from '../../../assets/icons/linkedin.svg';
import emailIcon from '../../../assets/icons/email.svg';
import { Button } from '../Button';
import { CustomIcon } from '../Icon/CustomIcon';

export interface SharePopUpProps {
  url: string;
  message: string;
}

export const SharePopUp: React.FC<SharePopUpProps> = ({ url, message }) => {
  const platforms = [
    {
      name: 'Instagram',
      icon: instagramIcon,
      link: `https://www.instagram.com/direct/new/?text=${message}&url=${url}`,
    },
    {
      name: 'Telegram',
      icon: telegramIcon,
      link: `https://t.me/share/url?url=${url}&text=${message}`,
    },
    {
      name: 'WhatsApp',
      icon: whatsappIcon,
      link: `https://wa.me/?text=${message} ${url}`,
    },
    {
      name: 'Linkedin',
      icon: linkedinIcon,
      link: `https://www.linkedin.com/sharing/share?url=${url}&title=${message}`,
    },
    {
      name: 'Email',
      icon: emailIcon,
      link: `mailto:?subject=${message}&body=${url}`,
    },
    {
      name: 'Sample 1',
      icon: emailIcon,
      link: `https://example.com/share?url=${url}&text=${message}`,
    },
    {
      name: 'Sample 2',
      icon: emailIcon,
      link: `https://example.com/share?url=${url}&text=${message}`,
    },
  ];

  const visibleItems = 5;
  const [currentIndex, setCurrentIndex] = useState(0);

  const goLeft = () => {
    setCurrentIndex(
      (prevIndex) =>
        Math.min(prevIndex + visibleItems, platforms.length - visibleItems) +
        0.75
    );
  };

  const goRight = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - visibleItems, 0));
  };

  return (
    <div className="relative rounded-3xl p-6 flex justify-center items-center gap-4 flex-col w-[440px] h-fit shadow-lg">
      {/* Close button */}
      <div className="absolute top-0 left-0 -mt-2 -ml-2 rounded-full flex justify-center items-center shadow-sm">
        <CustomIcon
          name="CustomCirlcleX"
          key={`CustomCirlcleX`}
          size="lg_plus"
        />
      </div>
      <h2 className="text-xl font-semibold">اشتراک گذاری</h2>
      <div className="flex flex-col gap-3 w-full">
        <p className="text-right text-sm text-gray-600 font-semibold">
          ارسال لینک به:
        </p>
        {currentIndex + visibleItems < platforms.length && (
          <button
            onClick={goLeft}
            className="z-10 bg-baseBackground p-1 text-brand-600 border-2 border-brand-600 rounded-full shadow-3xl absolute top-1/2 transform -translate-y-1/2 -mt-2 left-2"
          >
            <Icon name="chevron-left" size="md" />
          </button>
        )}
        <div className="relative flex items-center w-full overflow-hidden">
          {/* Left arrow button */}

          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${currentIndex * 88}px)` }} // 88px is the approximate width of each icon with gap
          >
            {platforms
              .slice(currentIndex, currentIndex + visibleItems)
              .map((platform, index) => (
                <a
                  className="flex flex-col items-center text-xs gap-2 w-16 mx-2"
                  key={index}
                  href={platform.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <img src={platform.icon} alt={platform.name} />
                  </div>
                  <span className="font-semibold">{platform.name}</span>
                </a>
              ))}
          </div>
        </div>
        {/* Right arrow button */}
        {currentIndex > 0 && (
          <button
            onClick={goRight}
            className="z-10 bg-baseBackground p-1 text-brand-600 border-2 border-brand-600 rounded-full shadow-3xl absolute top-1/2 transform -translate-y-1/2 right-2 -mt-2"
          >
            <Icon name="chevron-right" size="md" />
          </button>
        )}
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

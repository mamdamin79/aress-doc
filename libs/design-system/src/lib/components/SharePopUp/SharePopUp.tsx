import React from 'react';
import { Icon } from '../Icon';
import instagramIcon from '../../../assets/icons/instagram.svg';
import whatsappIcon from '../../../assets/icons/whatsapp.svg';
import telegramIcon from '../../../assets/icons/telegram.svg';
import linkedinIcon from '../../../assets/icons/linkedin.svg';
import emailIcon from '../../../assets/icons/email.svg';

// const maxMessageLength = {
//   email: 200,
//   linkedin: 300,
//   whatsapp: 400,
//   telegram: 400,
//   instagram: 300,
// };
export interface SharePopUpProps {
  url: string;
  message: string;
}

export const SharePopUp = ({ url, message }: SharePopUpProps) => {
  const platforms = [
    {
      name: 'Instagram',
      icon: instagramIcon,
      link: 'https://google.com',
    },
    {
      name: 'Telegram',
      icon: telegramIcon,
      link: 'https://google.com',
    },
    {
      name: 'WhatsApp',
      icon: whatsappIcon,
      link: 'https://google.com',
    },
    {
      name: 'Linkedin',
      icon: linkedinIcon,
      link: 'https://google.com',
    },
    {
      name: 'Email',
      icon: emailIcon,
      link: 'https://google.com',
    },
  ];

  return (
    <div className="relative rounded-3xl p-6 flex justify-center items-center gap-4 flex-col w-fit h-fit shadow-lg">
      {/* close button */}
      {/* <CustomIcon name='CustomCirlcleX' key={'CustomCirlcleX'} size='xl'/> */}
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
        <div className="flex justify-center gap-6">
          {platforms.map((platform, index) => (
            <a
              className="flex flex-col items-center text-xs gap-2"
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

      <div className="w-full h-fit rounded-xl p-2 gap-2 flex flex-row justify-between border-[2px] border-gray-300">
        <button
          onClick={() => navigator.clipboard.writeText(url)}
          className="ml-2 px-4 py-1 bg-brand-600 text-white rounded-md text-sm hover:bg-brand-700 transition-colors"
        >
          کپی لینک
        </button>
        <input
          type="text"
          readOnly
          value={url}
          className="font-semibold text-sm truncate outline-none"
        />
      </div>
    </div>
  );
};

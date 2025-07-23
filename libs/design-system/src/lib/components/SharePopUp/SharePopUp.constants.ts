import instagramIcon from '../../../assets/icons/instagram.svg?url';
import whatsappIcon from '../../../assets/icons/whatsapp.svg?url';
import telegramIcon from '../../../assets/icons/telegram.svg?url';
import linkedinIcon from '../../../assets/icons/linkedin.svg?url';
import emailIcon from '../../../assets/icons/email.svg?url';
export const platformMappings = (
  platformNames: string[],
  message: string,
  url: string,
) => {
  const allPlatforms = [
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

  return allPlatforms.filter((platform) =>
    platformNames.includes(platform.name),
  );
};
export type PlatformName =
  | 'Instagram'
  | 'Telegram'
  | 'WhatsApp'
  | 'Linkedin'
  | 'Email'
  | 'Sample 1'
  | 'Sample 2';

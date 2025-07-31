import { ReactComponent as InstagramIcon } from '../../../assets/icons/instagram.svg';
import { ReactComponent as WhatsappIcon } from '../../../assets/icons/whatsapp.svg';
import { ReactComponent as TelegramIcon } from '../../../assets/icons/telegram.svg';
import { ReactComponent as LinkedinIcon } from '../../../assets/icons/linkedin.svg';
import { ReactComponent as EmailIcon } from '../../../assets/icons/email.svg';

export const platformMappings = (
  platformNames: string[],
  message: string,
  url: string,
) => {
  const allPlatforms = [
    {
      name: 'Instagram',
      icon: InstagramIcon,
      link: `https://www.instagram.com/direct/new/?text=${message}&url=${url}`,
    },
    {
      name: 'Telegram',
      icon: TelegramIcon,
      link: `https://t.me/share/url?url=${url}&text=${message}`,
    },
    {
      name: 'WhatsApp',
      icon: WhatsappIcon,
      link: `https://wa.me/?text=${message} ${url}`,
    },
    {
      name: 'Linkedin',
      icon: LinkedinIcon,
      link: `https://www.linkedin.com/sharing/share?url=${url}&title=${message}`,
    },
    {
      name: 'Email',
      icon: EmailIcon,
      link: `mailto:?subject=${message}&body=${url}`,
    },
    {
      name: 'Sample 1',
      icon: EmailIcon,
      link: `https://example.com/share?url=${url}&text=${message}`,
    },
    {
      name: 'Sample 2',
      icon: EmailIcon,
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

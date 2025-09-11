export type Video = {
  src: string;
  title: string;
  date: string;
  poster?: string;
  qualities: { src: string; label: string }[];
  spriteBaseUrl?: {
    image: string;
    intervalSeconds: number;
  };
  avatarUrl?: string;
  name?: string;
  jobTitle?: string;
};

export type VideoQuality = { src: string; label: string };

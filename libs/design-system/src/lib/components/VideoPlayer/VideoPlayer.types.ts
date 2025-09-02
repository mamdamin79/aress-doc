export type Video = {
  src: string;
  title: string;
  date: string;
  poster?: string;
  qualities: { src: string; label: string }[];
  spriteBaseUrl?: string;
  avatarUrl?: string;
  name?: string;
  jobTitle?: string;
};

export type VideoQuality = { src: string; label: string };

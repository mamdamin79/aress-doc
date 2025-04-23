export type Video = {
  src: string;
  title: string;
  date: string;
  poster?: string;
  qualities: { src: string; label: string }[];
  spriteBaseUrl?: string;
};

export type VideoQuality = { src: string; label: string };

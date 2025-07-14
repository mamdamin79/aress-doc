'use client';

import { VideoPlayer } from 'design-system';
import React, { useState } from 'react';
import { type Video } from 'design-system';
import { VideoApiModel } from '@openapi';

interface VideoPlayerWrapperProps {
  data: VideoApiModel | null;
}

const getVideoQualities = (data: VideoApiModel | null): { src: string; label: string }[] => {
  if (!data) return [];

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

  const qualityMap = [
    { label: '1080', key: 'mp4Video1080P' },
    { label: '720', key: 'mp4Video720P' },
    { label: '480', key: 'mp4Video480P' },
    { label: '360', key: 'mp4Video360P' },
    { label: '240', key: 'mp4Video240P' },
  ] as const;

  return qualityMap
    .map(({ label, key }) => {
      const src = data[key as keyof VideoApiModel] as string | null;
      return src ? { src: `${baseUrl}${src}`, label } : null;
    })
    .filter(Boolean) as { src: string; label: string }[];
};

const getFallbackVideo = (): Video => ({
  qualities: [],
  title: 'ویدیو موجود نیست',
  src: '',
  date: '',
});

export const VideoPlayerWrapper: React.FC<VideoPlayerWrapperProps> = ({ data }) => {
  const qualities = getVideoQualities(data);

  const video: Video = data
    ? {
        qualities,
        title: data.title,
        src: qualities[0]?.src || '',
        date: '1403/09/22',
      }
    : getFallbackVideo();

  const [selectedVideo, setSelectedVideo] = useState<Video>(video);

  const videos: Video[] = [video];

  return (
    <div className="flex w-[424px] items-center justify-center gap-4 lg:w-[816px]">
      <VideoPlayer
        videos={videos}
        setSelectedVideo={setSelectedVideo}
        selectedVideo={selectedVideo}
        {...selectedVideo}
        className="w-full"
      />
    </div>
  );
};

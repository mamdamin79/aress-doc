'use client';
import { Video, VideoPlayer, PlayList } from 'design-system';
import React, { useState } from 'react';

const VideoWrapper = ({ videos }: { videos: Video[] }) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
          <p className="text-gray-500">No video available</p>
        </div>
      </div>
    );
  }

  const [selectedVideo, setSelectedVideo] = useState<Video>(videos[0]);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <VideoPlayer
        videos={videos}
        setSelectedVideo={setSelectedVideo}
        {...selectedVideo}
        className="h-[459px] w-full"
        selectedVideo={selectedVideo}
      />
      <PlayList
        playListTitle="لیست ویدیوها"
        isFullscreen={false}
        videos={videos}
        setSelectedVideo={setSelectedVideo}
        selectedVideo={selectedVideo}
      />
    </div>
  );
};

export default VideoWrapper;

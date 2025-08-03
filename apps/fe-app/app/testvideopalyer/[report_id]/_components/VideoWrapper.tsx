'use client';
import { Video, VideoPlayer } from 'design-system';
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
        className="w-full"
        selectedVideo={selectedVideo}
      />
    </div>
  );
};

export default VideoWrapper;

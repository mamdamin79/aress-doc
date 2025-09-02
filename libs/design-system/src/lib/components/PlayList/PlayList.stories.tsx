import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/nextjs';
import { PlayList } from './PlayList';
import video1080 from '../../../assets/videos/The Breathtaking Beauty of Nature1080p.mp4';
import video1080forest from '../../../assets/videos/Cinematic Forest-720.mp4';
import { Video } from '../VideoPlayer/VideoPlayer.types';

export default {
  title: 'Components/PlayList',
  component: PlayList,
} as Meta;

export const Default: StoryFn = () => {
  const videos: Video[] = [
    {
      qualities: [],
      title:
        'تحلیل داده‌های مالی و بازار بورس | کشف فرصت‌های سرمایه‌گذاری با استفاده از ابزارهای پردازش پیشرفته و تکنیک‌های نوین در تحلیل اطلاعات مالی',
      poster: 'https://api.classbon.com/api/picture/20219',
      src: video1080,
      date: '1403/09/22',
      avatarUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
      jobTitle: 'مدیر صندوق',
      name: 'محمد باقر خادمی',
    },
    {
      qualities: [],
      title:
        'بررسی داده‌های مالی و بازار بورس | با تحلیل‌های پیشرفته و ابزارهای نوین، فرصت‌های سرمایه‌گذاری را شناسایی کنید و استراتژی‌های هوشمندانه برای موفقیت در بازار سرمایه بیاموزید!',
      poster: 'https://api.classbon.com/api/picture/20219',
      src: video1080forest,
      date: '1403/11/22',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      jobTitle: 'مدیر عامل',
      name: 'ناظر زمانی',
    },
    {
      qualities: [],
      title:
        'بررسی داده‌های مالی و بازار بورس | با تحلیل‌های پیشرفته و ابزارهای نوین، فرصت‌های سرمایه‌گذاری را شناسایی کنید و استراتژی‌های هوشمندانه برای موفقیت در بازار سرمایه بیاموزید!',
      poster: 'https://api.classbon.com/api/picture/20219',
      src: video1080forest,
      date: '1403/11/22',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      jobTitle: 'مدیر عامل',
      name: 'ناظر زمانی',
    },
  ];
  const [selectedVideo, setSelectedVideo] = useState<Video>(videos[0]);

  return (
    <div className="flex items-center justify-center">
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

export interface Category {
  title: string;
  identifier: number;
}

export interface Video {
  identifier: number;
  mp4Video1080P: string;
  mp4Video1080PSizeBytes: number;
  mp4Video720P: string;
  mp4Video720PSizeBytes: number;
  mp4Video480P: string;
  mp4Video480PSizeBytes: number;
  mp4Video360P: string;
  mp4Video360PSizeBytes: number;
  mp4Video240P: string;
  mp4Video240PSizeBytes: number;
  durationInSeconds: number;
  poster1080P: string;
  poster720P: string;
  poster480P: string;
  poster360P: string;
  poster240P: string;
  thumbnailImage: string;
}

export interface ReportDetailPageApiResponse {
  identifier: number;
  title: string;
  htmlDescription: string;
  category: Category;
  image: string;
  summary: string;
  video: Video;
  userFavorite: boolean;
  isNew: boolean;
  relatedReports: Report[];
}

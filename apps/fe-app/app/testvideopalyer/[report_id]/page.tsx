import { Video } from 'design-system';
import VideoWrapper from './_components/VideoWrapper';

interface ServerVideoData {
  identifier: number;
  title: string;
  description: string;
  mp4Video1080P: string | null;
  mp4Video1080PSizeBytes: number | null;
  mp4Video720P: string | null;
  mp4Video720PSizeBytes: number | null;
  mp4Video480P: string | null;
  mp4Video480PSizeBytes: number | null;
  mp4Video360P: string | null;
  mp4Video360PSizeBytes: number | null;
  mp4Video240P: string | null;
  mp4Video240PSizeBytes: number | null;
  durationInSeconds: number;
  poster: string | null;
  thumbnailImages?: Array<{
    startTimeSeconds: number;
    durationSeconds: number;
    image: string;
    intervalSeconds: number;
    widthPixels: number;
    heightPixels: number;
    columns: number;
  }>;
}

// async function getData(id: number, screenshotQueryId?: string) {
//   const report = await ReportsService.getReportsByReportId({
//     reportId: String(id),
//     screenshotQueryId: screenshotQueryId,
//   });

//   return report;
// }

// Transform server video data to VideoPlayer format
function transformVideoData(
  serverVideo: ServerVideoData,
  baseURL: string,
): Video {
  const qualities = [];

  // Helper function to construct full URL
  const getFullUrl = (path: string | null | undefined) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `${baseURL}${path}`;
  };

  // Add available qualities in order of preference
  if (serverVideo.mp4Video1080P) {
    qualities.push({
      src: getFullUrl(serverVideo.mp4Video1080P)!,
      label: '1080p',
    });
  }

  if (serverVideo.mp4Video720P) {
    qualities.push({
      src: getFullUrl(serverVideo.mp4Video720P)!,
      label: '720p',
    });
  }

  if (serverVideo.mp4Video480P) {
    qualities.push({
      src: getFullUrl(serverVideo.mp4Video480P)!,
      label: '480p',
    });
  }

  if (serverVideo.mp4Video360P) {
    qualities.push({
      src: getFullUrl(serverVideo.mp4Video360P)!,
      label: '360p',
    });
  }

  if (serverVideo.mp4Video240P) {
    qualities.push({
      src: getFullUrl(serverVideo.mp4Video240P)!,
      label: '240p',
    });
  }

  // Use the highest available quality as the default src
  const defaultSrc = qualities.length > 0 ? qualities[0].src : '';

  return {
    src: defaultSrc,
    title: serverVideo.title || 'Untitled Video',
    date: new Date().toLocaleDateString('fa-IR'), // You might want to get this from server data
    poster: getFullUrl(serverVideo.poster) || '',
    qualities: qualities,
    spriteBaseUrl:
      getFullUrl(serverVideo.thumbnailImages?.[0]?.image) || undefined,
  };
}

export default async function Page() {
  // const { report_id } = await params;
  // const cookieStore = await cookies();

  // OpenAPI.TOKEN = cookieStore.get('access_token')?.value;
  // const screenshotQueryId = (await searchParams)?.queryId as string | undefined;
  // const id = String(report_id);

  // const REPORT = await getData(Number(id), screenshotQueryId);
  // console.log('Original video data:', REPORT.video);

  // // Get base URL for constructing full URLs
  // const baseURL =
  //   process.env.NEXT_PUBLIC_API_URL || 'http://185.236.36.153:8000';

  // // Transform the video data to the correct format
  // const videos: Video[] = [];

  // if (REPORT.video) {
  //   const transformedVideo = transformVideoData(
  //     REPORT.video as ServerVideoData,
  //     baseURL,
  //   );
  //   console.log('Transformed video data:', transformedVideo);
  //   videos.push(transformedVideo);
  // }
  // console.log('mamad');

  const testVideo: ServerVideoData = {
    identifier: 1,
    title: 'Big Buck Bunny',
    description: 'A short computer animated film',
    mp4Video1080P:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    mp4Video1080PSizeBytes: null,
    mp4Video720P:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    mp4Video720PSizeBytes: null,
    mp4Video480P:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    mp4Video480PSizeBytes: null,
    mp4Video360P: null,
    mp4Video360PSizeBytes: null,
    mp4Video240P: null,
    mp4Video240PSizeBytes: null,
    durationInSeconds: 596,
    poster:
      'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
    thumbnailImages: [],
  };

  const testVideo2: ServerVideoData = {
    identifier: 1,
    title: 'Big Buck Bunny',
    description: 'A short computer animated film',
    mp4Video1080P:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    mp4Video1080PSizeBytes: null,
    mp4Video720P:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    mp4Video720PSizeBytes: null,
    mp4Video480P:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    mp4Video480PSizeBytes: null,
    mp4Video360P: null,
    mp4Video360PSizeBytes: null,
    mp4Video240P: null,
    mp4Video240PSizeBytes: null,
    durationInSeconds: 596,
    poster:
      'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
    thumbnailImages: [],
  };
  const baseURL = '';
  const transformedVideo = transformVideoData(testVideo, baseURL);
  const transformedVideo2 = transformVideoData(testVideo2, baseURL);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">
        Video Player Test (Multiple Qualities)
      </h1>
      <VideoWrapper videos={[transformedVideo, transformedVideo2]} />
    </div>
  );
}

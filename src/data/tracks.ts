export type Track = {
  title: string;
  artist: string;
  youtubeVideoId: string;
  station?: string;
};

// Edit the playlist here. YouTube serves the video and audio; no local MP3s.
export const tracks: Track[] = [
  { title: 'AFTER HOURS', artist: 'THE WEEKND', youtubeVideoId: 'ygTZZpVkmKg' },
  { title: 'ALVAFRO', artist: 'FRED AGAIN AND LATIN MAFIA', youtubeVideoId: 'qj43MfnUw3o' },
  { title: 'CIGARRETTES OUT THE WINDOW', artist: 'TV GIRL', youtubeVideoId: '7j6C9METNm0' },
];

import {User} from './user.interface';

export interface Video {
  id: number
  width: string
  height: string
  url: string
  image: string
  duration: number
  user: User
  video_files: VideoFile[]
  videos_pictures: VideoPicture[]
}

export interface VideoFile {
  id: number
  quality: string
  file_type: string
  width?: number
  height?: number
  link: string
}

export interface VideoPicture {
  id: number
  nr: number
  picture: string
}

export interface ResponseVideos {
  page: number
  per_page: number
  total_results: number
  url: string
  next_page: string
  prev_page: string
  videos: Video[]
}

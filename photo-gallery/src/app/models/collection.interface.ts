import {VideoFile, VideoPicture} from './video.interface';
import {User} from './user.interface';
import {Photo, Src} from './photo.interface';

export interface Collection {
  id: string
  title: string
  description?: string
  private: boolean
  media_count: number
  photos_count: number
  videos_count: number
}

export interface PexelsResponseCollections {
  collections: Collection[]
  page: number
  per_page: number
  total_results: number
  next_page?: string
  prev_page?: string
}

export interface CollectionDetail {
  id: string
  media: Media[]
  page: number
  per_page: number
  total_results: number
  next_page?: string
  prev_page?: string
}

export interface Media {
  type: 'Photo' | 'Video';
  id: number;
  width: number;
  height: number;
  url: string;

  // Commun aux photos et vidéos
  photographer?: string;
  photographer_url?: string;
  photographer_id?: number;

  // Spécifique aux photos
  avg_color?: string;
  src?: Src;
  liked?: boolean;
  alt?: string;

  // Spécifique aux vidéos
  duration?: number;
  image?: string;  // Image de prévisualisation
  video_files?: VideoFile[];
  video_pictures?: VideoPicture[];
  user?: User;

  // Autres
  full_res?: any;
  tags?: string[];
}

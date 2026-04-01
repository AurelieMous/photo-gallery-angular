import {Media} from '../models/collection.interface';
import {Photo} from '../models/photo.interface';
import {Video, VideoFile} from '../models/video.interface';

/*
* Convertir un objet Media en un objet Photo
* @param media
* @returns Photo | null
*/
export function mediaToPhoto(media: Media): Photo | null {
  // Vérifier que c'est bien une photo avec toutes les propriétés requises
  if (
    media.type !== 'Photo' ||
    !media.src ||
    !media.photographer ||
    !media.photographer_url ||
    !media.avg_color
  ) {
    return null;
  }

  return {
    id: media.id,
    width: media.width,
    height: media.height,
    url: media.url,
    photographer: media.photographer,
    photographer_url: media.photographer_url,
    photographer_id: media.photographer_id || 0,
    avg_color: media.avg_color,
    src: media.src,
    liked: media.liked || false,
    alt: media.alt || ''
  }
}

/**
 * Convertir un objet Media en un objet Video
 * @param media
 * @returns Video | null
 */
export function mediaToVideo(media: Media): Video | null {
  // Vérifier que c'est bien une vidéo avec toutes les propriétés requises
  if (
    media.type !== 'Video' ||
    !media.video_files ||
    !media.user
  ) {
    return null;
  }

  return {
    id: media.id,
    width: media.width.toString(),
    height: media.height.toString(),
    url: media.url,
    image: media.image || '',
    duration: media.duration || 0,
    user: media.user,
    video_files: media.video_files,
    videos_pictures: media.video_pictures || []
  };
}

/**
 * Type guard pour vérifier si un Media est une Photo
 */
export function isPhoto(media: Media): media is Media & { src: Required<Media['src']> } {
  return media.type === 'Photo' && media.src !== undefined;
}

/**
 * Type guard pour vérifier si un Media est une Vidéo
 */
export function isVideo(media: Media): media is Media & { video_files: VideoFile[] } {
  return media.type === 'Video' && media.video_files !== undefined;
}

/**
 * Filtre uniquement les photos d'une liste de Media
 */
export function filterPhotos(mediaList: Media[]): Photo[] {
  return mediaList
    .filter(isPhoto)
    .map(mediaToPhoto)
    .filter((photo): photo is Photo => photo !== null);
}

/**
 * Filtre uniquement les vidéos d'une liste de Media
 */
export function filterVideos(mediaList: Media[]): Media[] {
  return mediaList.filter(isVideo);
}


/**
 * Compte le nombre de photos dans une liste de Media
 */
export function countPhotos(mediaList: Media[]): number {
  return mediaList.filter(isPhoto).length;
}

/**
 * Compte le nombre de vidéos dans une liste de Media
 */
export function countVideos(mediaList: Media[]): number {
  return mediaList.filter(isVideo).length;
}

/**
 * Sépare les photos des videos dans une liste de Media
 */
export function separateMedia(mediaList: Media[]): { photos: Photo[], videos: Media[] } {
  return {
    photos: filterPhotos(mediaList),
    videos: filterVideos(mediaList)
  };
}

/**
 * Filtre et convertit les vidéos en Video[]
 */
export function filterAndConvertVideos(mediaList: Media[]): Video[] {
  return mediaList
    .filter(isVideo)
    .map(mediaToVideo)
    .filter((video): video is Video => video !== null);
}

/**
 * Sépare et convertit photos et vidéos
 */
export function separateAndConvertMedia(mediaList: Media[]): { photos: Photo[], videos: Video[] } {
  return {
    photos: filterPhotos(mediaList),
    videos: filterAndConvertVideos(mediaList)
  };
}

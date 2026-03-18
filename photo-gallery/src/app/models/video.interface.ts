

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

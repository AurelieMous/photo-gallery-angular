export interface Photo {
  id: number;
  photographer: string;
  alt: string;
  src: {
    medium: string;
  }
}

export interface PexelsResponse {
  page: number;
  per_page: number;
  photos: Photo[];
  total_results: number;
  next_page?: string;
}

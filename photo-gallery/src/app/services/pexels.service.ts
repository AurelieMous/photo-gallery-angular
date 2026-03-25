import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {PexelsResponse, Photo} from '../models/photo.interface';
import {Observable} from 'rxjs';
import {Collection, CollectionDetail, PexelsResponseCollections} from '../models/collection.interface';

@Injectable({
  providedIn: 'root',
})
export class PexelsService {
  private apiUrl = environment.pexelsApiUrl;
  private apiKey = environment.pexelsApiKey;
  private apiKeyVideos = environment.pexelsApiUrlVideos

  constructor(private http: HttpClient) { }

  // PHOTOS
  // Récupérer toutes les photos
  getPhotos(page: number = 1, per_page: number = 80): Observable<PexelsResponse> {
    return this.http.get<PexelsResponse>(`${this.apiUrl}/curated?page=${page}&per_page=${per_page}`, {
      headers: { 'Authorization': this.apiKey }
    });
  }

  // Récupérer une photo par son id
  getImage(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.apiUrl}/photos/${id}`, {
      headers: { 'Authorization': this.apiKey }
    });
  }

  // Barre de recherche
  searchPhotos(query: string, page: number = 1, per_page: number = 80): Observable<PexelsResponse> {
    return this.http.get<PexelsResponse>(`${this.apiUrl}/search?query=${query}&${page}&per_page=${per_page}&fr-FR`, {
      headers: { 'Authorization': this.apiKey }
    });
  }

  // COLLECTIONS

  // Récupérer toutes les collections
  getCollections(url?: string) {
    const endpoint = url ?? `${this.apiUrl}/collections/featured`;
    return this.http.get<PexelsResponseCollections>(endpoint, {
      headers: { 'Authorization': this.apiKey }
    });
  }

  // Récupérer une collection par son id
  getOneCollection(id: string, page?: number, per_page?: number) {
    if (!page && !per_page)  {
      return this.http.get<CollectionDetail>(`${this.apiUrl}/collections/${id}`, {
        headers: { 'Authorization': this.apiKey }
      });
    }

    return this.http.get<CollectionDetail>(`${this.apiUrl}/collections/${id}?page=${page}per_page=${per_page}`, {
      headers: { 'Authorization': this.apiKey }
    })
  }


  // VIDEOS
  // Récupérer des videos
  getVideos() {
    return this.http.get(`${this.apiKeyVideos}/videos/popular`, {})
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {PexelsResponse, Photo} from '../models/photo.interface';
import {Observable} from 'rxjs';

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
  getPhotos(): Observable<PexelsResponse> {
    return this.http.get<PexelsResponse>(`${this.apiUrl}/curated`, {
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
  searchForPhotos(query: string) {
    return this.http.get(`${this.apiUrl}/search?query=${query}`, {
      headers: { 'Authorization': this.apiKey }
    });
  }

  // COLLECTIONS

  // Récupérer toutes les collections
  getCollections() {
    return this.http.get(`${this.apiUrl}/collections`, {
      headers: { 'Authorization': this.apiKey }
    });
  }

  // Récupérer une collection par son id
  getCollection(id: string) {
    return this.http.get(`${this.apiUrl}/collections/${id}`, {})
  }

  futuredCollections() {
    return this.http.get(`${this.apiUrl}/collections/featured`, {})
  }

  // Récupérer mes collections
  getMyCollections() {
    return this.http.get(`${this.apiUrl}/collections/mine`, {})
  }

  // VIDEOS
  // Récupérer des videos
  getVideos() {
    return this.http.get(`${this.apiKeyVideos}/videos/popular`, {})
  }
}

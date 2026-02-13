import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {PexelsResponse} from '../models/photo.interface';

@Injectable({
  providedIn: 'root',
})
export class PexelsService {
  private apiUrl = environment.pexelsApiUrl;
  private apiKey = environment.pexelsApiKey;

  constructor(private http: HttpClient) { }

  getPhotos() {
    return this.http.get<PexelsResponse>(`${this.apiUrl}/curated`, {
      headers: { 'Authorization': this.apiKey }
    });
  }
}

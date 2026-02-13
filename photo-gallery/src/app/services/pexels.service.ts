import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PexelsService {
  constructor(private http: HttpClient) { }

  getPhotos() {
    return this.http.get()
  }
}

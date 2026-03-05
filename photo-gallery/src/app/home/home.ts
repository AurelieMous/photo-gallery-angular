import {Component, inject, OnInit, signal} from '@angular/core';
import {PexelsService} from '../services/pexels.service';
import {Photo} from '../models/photo.interface';
import {ImgCardComponent} from './img-card/img-card';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [ImgCardComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  // Injecter le service
  private pexelsService = inject(PexelsService);

  isLoading = signal(false);

  // créer la variable pour stocker les photos
  photos = signal<Photo[]>([]);

  ngOnInit() {
    this.isLoading.set(true);

    this.pexelsService.getPhotos().subscribe({
      next: (data) => {
        this.photos.set(data.photos);
        this.isLoading.set(false);
      }
    });
  }
}

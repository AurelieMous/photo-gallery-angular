import { Component, inject, signal, OnInit } from '@angular/core';
import { PexelsService } from '../../services/pexels.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  Collection,
  CollectionDetail,
  Media,

} from '../../models/collection.interface';
import { ImgCardComponent } from '../../home/img-card/img-card';
import { Photo } from '../../models/photo.interface';
import { CommonModule } from '@angular/common';
import {filterPhotos, filterVideos, mediaToPhoto, separateMedia} from '../../helpers';
import {PaginationComponent} from '../../shared/pagination/pagination';
import {ErrorStateComponent} from '../../shared/error-state/error-state';
import {VideosCardComponent} from '../../videos/videos-card/videos-card';
import {separateAndConvertMedia} from '../../helpers/media.helpers';

@Component({
  selector: 'app-collection-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ImgCardComponent, PaginationComponent, ErrorStateComponent, VideosCardComponent],
  templateUrl: './collection-detail.html',
  styleUrl: './collection-detail.css',
})

export class CollectionDetailComponent implements OnInit {
  // Services injectés
  private pexelsService = inject(PexelsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // States
  error = signal('');
  isLoading = signal(false);

  // Infos de la collection (title, description) passées en state
  collectionInfo = signal<Collection | null>(null);

  // Détails de la collection (médias) depuis l'API
  collectionDetails = signal<CollectionDetail | null>(null);

  // Médias filtrés
  photos = signal<Photo[]>([]);
  videos = signal<Media[]>([]);

  // gérer les paginations
  currentPage = signal<number>(1);
  totalResults = signal<number>(0);
  perPage= 80;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const page = Number(params['page']) || 1;
      this.currentPage.set(page);

      // Récupérer l'ID depuis l'URL
      const id: string | null = this.route.snapshot.paramMap.get('id');

      if (!id) {
        this.error.set('Aucun ID fourni');
        this.isLoading.set(false);
        return;
      }
      this.loadCollectionDetails(id, page, this.perPage);
    })

    // Récupérer les infos passées en state depuis la navigation
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { collection?: Collection } | undefined;

    if (state?.collection) {
      this.collectionInfo.set(state.collection);
    } else {
      console.warn('Pas de state passé, titre/description non disponibles');
    }
  }

  onPageChange(page: number) {
    // scroller en haut de la page
    window.scrollTo({top: 0, behavior: 'smooth'});

    // Mettre a jour l'url avec ala bonne page
    const queryParams: any = {page: page};

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: ''
    });
  }

  private loadCollectionDetails(id: string, page: number, perPage: number) {
    this.isLoading.set(true);

    this.pexelsService.getOneCollection(id, page, this.perPage).subscribe({
      next: (data) => {

        this.collectionDetails.set(data);
        this.currentPage.set(page)

        // Séparer et convertir photos et vidéos
        const { photos, videos } = separateAndConvertMedia(data.media);

        this.photos.set(photos);
        this.videos.set(videos);

        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Impossible de charger la collection');
        this.isLoading.set(false);
      }
    });
  }
}

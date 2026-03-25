import {Component, inject, OnInit, signal} from '@angular/core';
import {PexelsService} from '../services/pexels.service';
import {Photo} from '../models/photo.interface';
import {ImgCardComponent} from './img-card/img-card';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {SearchBarComponent} from '../shared/search-bar/search-bar';
import {FormsModule} from '@angular/forms';
import {PaginationComponent} from '../shared/pagination/pagination';
import {ErrorStateComponent} from '../shared/error-state/error-state';


@Component({
  selector: 'app-home',
  imports: [ImgCardComponent, SearchBarComponent, FormsModule, PaginationComponent, ErrorStateComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {

  // Injecter le service
  private pexelsService = inject(PexelsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Gérer les états
  isLoading = signal<boolean>(false);
  // créer la variable pour stocker les photos
  photos = signal<Photo[]>([]);
  // pour savoir quelle recherche est en cours
  currentSearch = signal<string>('');
  error = signal<string>('');

  // gérer les paginations
  currentPage = signal<number>(1);
  totalResults = signal<number>(0);
  perPage= 80;

  // Récupérer toutes les photos et les envoyés au composant enfant
  ngOnInit() {
    // Écouter TOUS les changements de query params (pas juste au démarrage)
    this.route.queryParams.subscribe(params => {
      const query = params['search'] || '';
      const page = Number(params['page']) || 1;

      this.currentSearch.set(query);
      this.currentPage.set(page);

      if (query) {
        this.searchPhotos(query, page);
      } else {
        this.loadCuratedPhotos(page);
      }
    });
  }

  search(query: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {search: query},
      queryParamsHandling: ''
    })
  }

  onPageChange(page: number) {
    // scroller en haut de la page
    window.scrollTo({top: 0, behavior: 'smooth'});

    // Mettre a jour l'url avec ala bonne page
    const queryParams: any = {page: page};

    if (this.currentSearch()) {
      queryParams.search = this.currentSearch();
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: ''
    });
  }

  // ========== MÉTHODES PRIVÉES (helpers) ==========

  // Méthode 1 : Charger les photos par défaut (curées)
  private loadCuratedPhotos(page: number = 1){
    this.isLoading.set(true);

    this.pexelsService.getPhotos(page, this.perPage).subscribe({
      next: (data) => {
        this.photos.set(data.photos);
        this.totalResults.set(data.total_results);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(`Impossible de charger les photos : ${err.message}`);
        this.isLoading.set(false);
      }
    });
  }

  private searchPhotos(query: string, page: number = 1) {
    this.isLoading.set(true);
    this.pexelsService.searchPhotos(query, page, this.perPage).subscribe({
      next: (data) => {
        this.photos.set(data.photos);
        this.totalResults.set(data.total_results);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(`Impossible de charger les photos recherchées : ${err}`)
        this.isLoading.set(false);
      }
    })
  }

}

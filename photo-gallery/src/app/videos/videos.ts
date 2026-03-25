import {Component, inject, OnInit, signal} from '@angular/core';
import {PexelsService} from '../services/pexels.service';
import {Video} from '../models/video.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorStateComponent} from '../shared/error-state/error-state';
import {ImgCardComponent} from '../home/img-card/img-card';
import {PaginationComponent} from '../shared/pagination/pagination';
import {SearchBarComponent} from '../shared/search-bar/search-bar';
import {VideosCardComponent} from './videos-card/videos-card';

@Component({
  selector: 'app-videos',
  imports: [
    ErrorStateComponent,
    PaginationComponent,
    SearchBarComponent,
    VideosCardComponent
  ],
  templateUrl: './videos.html',
  styleUrl: './videos.css',
})
export class VideosComponent implements OnInit{
  private pexels = inject(PexelsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isLoading = signal<boolean>(false);
  error = signal<string>('');
  videos = signal<Video[]>([]);
  currentPage = signal<number>(1);
  totalResults = signal<number>(0);
  perPage = 80;

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      const page = Number(params['page']) || 1;
      this.currentPage.set(page);

      this.loadVideos(page, this.perPage);
    })
  }

  private loadVideos(page: number, perPage: number) {
    this.isLoading.set(true);
    this.error.set('');

    this.pexels.getVideos(page, perPage).subscribe({
      next: (data) => {
        this.videos.set(data.videos);
        this.totalResults.set(data.total_results);
        this.isLoading.set(false);
      },
    })
  }

  onPageChange(page: number){
    window.scrollTo({top: 0, behavior: 'smooth'});

    // mise à jour de l'url avec la bonne page
    const queryParams: any = {page: page};

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: ''
    })
  }
}

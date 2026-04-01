import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {PexelsService} from '../../services/pexels.service';
import {Video} from '../../models/video.interface';
import { Location } from '@angular/common';
import {ErrorStateComponent} from '../../shared/error-state/error-state';

@Component({
  selector: 'app-videos-detail',
  imports: [
    ErrorStateComponent,
    RouterLink
  ],
  templateUrl: './videos-detail.html',
  styleUrl: './videos-detail.css',
  standalone: true
})
export class VideosDetailComponent {
  private pexelsService = inject(PexelsService);
  route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);


  error = signal<string>('')
  isLoading = signal<boolean>(false);

  video = signal<Video | null>(null)

  videoUrl = computed(() => {
    const videoFiles = this.video()?.video_files;

    if (!videoFiles || videoFiles.length === 0) {
      return '';
    }

    // Chercher la qualité HD
    const videoHd = videoFiles.find(f => f.quality === 'hd');

    if (videoHd) {
      return videoHd.link;
    }

    // Sinon, prendre la première vidéo disponible
    return videoFiles[0].link;
  });

  ngOnInit() {
    this.isLoading.set(true);

    const idString : string | null = this.route.snapshot.paramMap.get('id');
    console.log('idString:', idString);
    if (!idString) {
      this.error.set('Aucun ID fourni');
      this.isLoading.set(false);
      return;
    }

    const id = Number(idString);
    if (isNaN(id)) {
      this.isLoading.set(false);
      this.error.set('ID invalide');
    }

    this.loadVideo(id)
  }

  private loadVideo(id: number) {
    this.pexelsService.getOneVideo(id).subscribe({
      next: (data: Video) => {
        this.video.set(data);
        this.isLoading.set(false)
      },
      error: (err) => {
        this.error.set(`Impossible de charger la video : ${err.message}`);
        this.isLoading.set(false);
      }
    })
  }

  formatDuration(seconds: number): string {
    if (!seconds) return '0:00';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Télécharger la video
  downloadVideo(file: any) {
    const link = document.createElement('a');
    link.href = file.link;
    link.download = `pexels-video-${this.video()?.id}-${file.quality}.mp4`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  goBack(){
    this.location.back()
  }

}

import {Component, computed, ElementRef, input, Input, ViewChild} from '@angular/core';
import {Video} from '../../models/video.interface';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-videos-card',
  imports: [
    RouterLink
  ],
  templateUrl: './videos-card.html',
  styleUrl: './videos-card.css',
  standalone: true
})
export class VideosCardComponent {
  video = input.required<Video>();

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  isPlaying = false;

  videoUrl = computed(() => {
    const videoFiles = this.video().video_files;
    const videoHd = videoFiles?.find((f: any) => f.quality === 'hd')?.link;

    if (!videoHd && videoFiles && videoFiles.length > 0) {
      return videoFiles[0].link;
    }

    return videoHd || '';
  });

  playVideo() {
    const video = this.videoPlayer?.nativeElement;
    if (video) {
      this.isPlaying = true;
      video.muted = true;

      video.play().catch(err => {
        console.error('Impossible de lire la vidéo:', err);
        this.isPlaying = false;
      });
    }
  }

  pauseVideo() {
    const video = this.videoPlayer?.nativeElement;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    this.isPlaying = false;
  }
}

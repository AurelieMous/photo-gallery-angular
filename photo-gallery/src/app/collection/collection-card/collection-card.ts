import {Component, inject, input, Input, signal} from '@angular/core';
import {Collection, CollectionDetail, Media} from '../../models/collection.interface';
import {RouterLink} from '@angular/router';
import {PexelsService} from '../../services/pexels.service';

@Component({
  selector: 'app-collection-card',
  imports: [
    RouterLink
  ],
  templateUrl: './collection-card.html',
  styleUrl: './collection-card.css',
})
export class CollectionCardComponent {
  collection = input.required<Collection>()// données du parent

  pexelsService = inject(PexelsService);

  firstMedia = signal<Media | null>(null);

  ngOnInit() {
    this.getFirstMedia();
  }

  private getFirstMedia() {
    this.pexelsService.getOneCollection(this.collection().id).subscribe({
      next: (response: CollectionDetail) => {
        const first = response.media?.[0] ?? null;
        this.firstMedia.set(first);
      },
      error: (err) => console.error(err)
    });
  }
}

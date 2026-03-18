import {Component, inject, signal} from '@angular/core';
import {PexelsService} from '../../services/pexels.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CollectionDetail} from '../../models/collection.interface';

@Component({
  selector: 'app-collection-detail',
  imports: [RouterLink],
  templateUrl: './collection-detail.html',
  styleUrl: './collection-detail.css',
})
export class CollectionDetailComponent {
  private pexelsService = inject(PexelsService);
  route = inject(ActivatedRoute);

  error = signal('')
  isLoading = signal(false);

  collection = signal<CollectionDetail | null>(null);

  ngOnInit() {
    this.isLoading.set(true);

    const id : string | null = this.route.snapshot.paramMap.get('id');

    if (id === null) {
      this.error.set('Aucun ID fourni');
      return;
    }

    this.pexelsService.getOneCollection(id).subscribe(
      {
        next: data => {
          this.collection.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set('Impossible de charger la collection');
          this.isLoading.set(false);
        }
      }
    )
  }

}

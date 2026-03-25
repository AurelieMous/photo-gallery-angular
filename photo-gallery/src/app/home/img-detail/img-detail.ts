import {Component, inject, signal} from '@angular/core';
import {PexelsService} from '../../services/pexels.service';
import {Photo} from '../../models/photo.interface';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ErrorStateComponent} from '../../shared/error-state/error-state';

@Component({
  selector: 'app-img-detail',
  imports: [
    RouterLink,
    ErrorStateComponent
  ],
  templateUrl: './img-detail.html',
  styleUrl: './img-detail.css',
})
export class ImgDetailComponent {
    // injecter le service
  private pexelsService = inject(PexelsService);
  route = inject(ActivatedRoute);

  error = signal('');
  isLoading = signal(false);

  photo = signal<Photo | null>(null);

  ngOnInit() {
    this.isLoading.set(true);

    // récupérer l'id dans l'url
    const idString : string | null = this.route.snapshot.paramMap.get('id');
    if (!idString) {
      // Gérer l'erreur : pas d'ID dans l'URL
      this.error.set('Aucun ID fourni');
      this.isLoading.set(false);
      return;
    }

    const id = Number(idString);
    // vérifier que c'est bien un nombre valide
    if (isNaN(id)) {
      this.error.set('ID invalide');
      this.isLoading.set(false);
      return;
    }

    // récupération avec appel api
    this.pexelsService.getImage(id).subscribe({
      next: (data: Photo) => {
        this.photo.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(`Impossible de charger la photo : ${err.message}`)
        this.isLoading.set(false);
      }
    })
  }
}

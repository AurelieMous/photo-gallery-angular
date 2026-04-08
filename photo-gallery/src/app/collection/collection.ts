import {Component, inject, signal, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {PexelsService} from '../services/pexels.service';
import {Collection} from '../models/collection.interface';
import {CollectionCardComponent} from './collection-card/collection-card';
import {ErrorStateComponent} from '../shared/error-state/error-state';

@Component({
  selector: 'app-collection',
  imports: [CollectionCardComponent, ErrorStateComponent],
  templateUrl: './collection.html',
  styleUrl: './collection.css',
})
export class CollectionComponent implements OnInit, AfterViewInit, OnDestroy {

  // Référence à l'élément HTML en bas de page qui sert de "capteur" pour le scroll infini
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;

  private pexelsService = inject(PexelsService);

  // L'Intersection Observer surveille quand le scrollAnchor devient visible à l'écran
  private observer!: IntersectionObserver;

  collections = signal<Collection[]>([]);
  error = signal<string>('');
  isLoading = signal<boolean>(false);

  // Stocke l'URL de la prochaine page renvoyée par l'API (null = plus de page disponible)
  nextPage = signal<string | null>(null);

  ngOnInit() {
    this.loadCollections(); // Charge la première page au démarrage
  }

  ngAfterViewInit() {
    // On initialise l'observer après que la vue soit prête (scrollAnchor doit exister dans le DOM)
    this.observer = new IntersectionObserver((entries) => {
      // Déclenché automatiquement quand scrollAnchor entre dans le viewport
      // On charge la page suivante seulement si :
      // - l'élément est visible (isIntersecting)
      // - il existe une page suivante (nextPage)
      // - un chargement n'est pas déjà en cours (isLoading)
      if (entries[0].isIntersecting && this.nextPage() && !this.isLoading()) {
        this.loadCollections(this.nextPage()!);
      }
    }, { threshold: 0.1 }); // 0.1 = se déclenche dès que 10% de l'élément est visible

    this.observer.observe(this.scrollAnchor.nativeElement);
  }

  ngOnDestroy() {
    // Indispensable pour éviter les fuites mémoire : on arrête l'observation quand le composant est détruit
    this.observer?.disconnect();
  }

  private loadCollections(url?: string) {
    this.isLoading.set(true);
    this.error.set('');

    this.pexelsService.getCollections(url).subscribe({
      next: (data) => {
        // update() au lieu de set() pour AJOUTER les nouvelles collections
        // aux existantes plutôt que de les remplacer
        this.collections.update(current => [...current, ...data.collections]);

        // On stocke la prochaine URL ou null si on est à la dernière page
        const nextUrl = data.next_page?.replace('/v1/v1/', '/v1/') ?? null;
        this.nextPage.set(nextUrl);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(`Impossible de charger les collections : ${err.message}`);
      }
    });
  }
}

import {Component, inject, OnInit, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [
    FormsModule
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
  standalone: true
})
export class SearchBarComponent implements OnInit{
  private route = inject(ActivatedRoute);

  // Output pour envoyer la recherche au parent
  search = output<string>();

  // Signal pour stocker la valeur de recherche
  searchQuery =  '';

  suggestions = ['Nature', 'Montagne', 'Ville', 'Animaux', 'Mer', 'Forêt'];

  ngOnInit() {
    // Synchroniser l'input avec le query param de l'URL
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
    });
  }

  // Méthode appelée quand on appuie sur Entrée
  onSearch() {
    const query = this.searchQuery.trim();

    if (query) {
      // Émettre la recherche vers le parent
      this.search.emit(query);
    }
  }

  // Effacer la recherche
  clearSearch() {
    this.searchQuery = '';
    // Émettre une chaîne vide pour réinitialiser
    this.search.emit('');
  }

  // Rechercher une suggestion
  searchSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.search.emit(suggestion);
  }

}

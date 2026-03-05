import {Component, input, output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class PaginationComponent {
  //inputs
  currentPage = input<number>(1);
  totalResults = input<number>(0);
  perPage = input<number>(80);

  // output
  pageChange = output<number>();

  // calculer le nombre de pages
  get totalPages() {
    return Math.ceil(this.totalResults() / this.perPage());
  }

  // vérifier si on vet aller à la page précédente
  get hasPreviousPage () {
    return this.currentPage() > 1;
  }

  // Vérifier si on peut aller à la page suivante
  get hasNext(): boolean {
    return this.currentPage() < this.totalPages;
  }

  // Aller à une page spécifique
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  // Page précédente
  previousPage() {
    if (this.hasPreviousPage) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  // Page suivante
  nextPage() {
    if (this.hasNext) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  get pageNumbers(): number[] {
    const current = this.currentPage()
    const total = this.totalPages;
    const delta = 2; //nombre de page avant/après la page actuelle

    const pages: number[] = [];

    // toujours afficher la première page
    pages.push(1);

    // Pages autour de la page actuelle
    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      pages.push(i);
    }
    // Toujours afficher la dernière page
    if (total > 1) {
      pages.push(total);
    }

    // Retirer les doublons et trier
    return [...new Set(pages)].sort((a, b) => a - b);
  }

}

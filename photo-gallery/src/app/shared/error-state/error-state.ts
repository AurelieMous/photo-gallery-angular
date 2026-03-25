import {Component, input, output} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-error-state',
  imports: [
    RouterLink
  ],
  templateUrl: './error-state.html',
  styleUrl: './error-state.css',
})
export class ErrorStateComponent {
  // Input
  message = input<string>("Une erreur est survenue.");
  title = input<string>("Erreur");

  // Actions
  buttonText = input<string>('Retour');
  buttonLink = input<string | null>(null);  // Si null, affiche un bouton retry

  // Output pour retry
  retry = output<void>();

  onRetry() {
    this.retry.emit();
  }
}

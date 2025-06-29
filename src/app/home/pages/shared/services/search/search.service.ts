import { computed, Injectable, signal } from '@angular/core';

// Interfaces
import { GalleryCard } from '../../../gallery/interfaces/gallery-card.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // Signals para manejar estado de búsqueda
  private searchTermSignal = signal<string>('');
  private searchResultsSignal = signal<GalleryCard[]>([]);
  private isSearchingSignal = signal<boolean>(false);
  private showResultsSectionSignal = signal<boolean>(false);

  // Computed signals públicos
  readonly searchTerm = computed(() => this.searchTermSignal());
  readonly searchResults = computed(() => this.searchResultsSignal());
  readonly hasResults = computed(() => this.searchResultsSignal().length > 0);
  readonly isSearching = computed(() => this.isSearchingSignal());
  readonly showResultsSection = computed(() => this.showResultsSectionSignal());
  readonly resultCount = computed(() => this.searchResultsSignal().length);

  // Actualizar término de búsqueda
  updateSearchTerm (term: string): void {
    this.searchTermSignal.set(term);

    if (!term.trim()) this.clearSearch();
  }

  // Actualizar resultados de búsqueda
  updateSearchResults (results: GalleryCard[]): void {
    this.searchResultsSignal.set(results);
    this.isSearchingSignal.set(false);

    // Mostrar sección si hay resultados (aparece ni bien escribes en el input)
    // if (results.length > 0) this.showResultsSectionSignal.set(true);
  }

  // Iniciar búsqueda
  startSearch(): void {
    this.isSearchingSignal.set(true);
  }

  // Limpiar búsqueda
  clearSearch(): void {
    this.searchTermSignal.set('');
    this.searchResultsSignal.set([]);
    this.isSearchingSignal.set(false);
    this.showResultsSectionSignal.set(false);
  }

  // Toggle sección de resultados
  toggleResultsSection(): void {
    if (this.hasResults()) this.showResultsSectionSignal.update(value => !value);
  }

  // Ocultar sección de resultados
  hideResultsSection(): void {
    this.showResultsSectionSignal.set(false);
  }
}



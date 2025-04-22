import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal
} from '@angular/core';

// Font Awesome
import { faMagnifyingGlass, IconDefinition } from '@fortawesome/free-solid-svg-icons';

/**
 * Componente de búsqueda adaptable según el contexto
 *
 * Este componente se adapta según la página en la que se encuentre:
 * - En gallery: "Galería y Categoría"
 * - En list: "Lista"
 */
@Component({
  selector: 'home-shared-search',
  standalone: false,

  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  // Icono (readonly para prevenir modificaciones accidentales)
  readonly faMagnifyingGlass: IconDefinition = faMagnifyingGlass;

  // Señales de entrada
  pageType = input<'gallery' | 'list'>('gallery'); // Tipo de página donde está el componente

  // Señales internas
  private searchTermSignal = signal<string>('');

  // Señal de salida para emitir términos de búsqueda
  searchValue = output<string>();

  // Señal computada para el texto según el contexto de la página
  readonly displayText = computed<{ text: string, placeholder: string }>(() => {
    const type = this.pageType();

    if (type === 'gallery') {
      return {
        text: '<span>Galería</span> y <span>Categoría</span>',
        placeholder: 'Busca algún item de tu galería o por categoría...'
      }
    } else {
      return {
        text: '<span>Lista</span>',
        placeholder: 'Busca algún item de tu lista...'
      }
    }
  })

  // Obtiene el valor actual del término de busqueda
  get searchTerm(): string {
    return this.searchTermSignal();
  }

  // Actualiza el término de búsqueda y emite el nuevo valor
  updateSearchTerm (event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTermSignal.set(input.value);

    // Emite el valor de búsqueda
    this.searchValue.emit(input.value);
  }

  // Maneja el envío del formulario
  onSubmit (event: Event): void {
    event.preventDefault();
    this.searchValue.emit(this.searchTerm);
  }

}

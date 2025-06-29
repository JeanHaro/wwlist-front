import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild
} from '@angular/core';

// Font Awesome
import {
  faChevronDown,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

// Animaciones
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

// Servicios
import { SearchService } from '../../services/search/search.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // Animación para la flecha indicadora
    trigger( 'arrowIndicator' , [
      transition( ':enter' , [
        style({ opacity: 0, tranform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition( ':leave' , [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ]),
    // Animación para la sección de resultados
    trigger( 'resultsSection' , [
      transition( ':enter' , [
        style({ height: 0, opacity: 0 }),
        animate('400ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ]),
    // Animación para cada card de resultado
    trigger( 'resultCard' , [
      transition( ':enter' , [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
    ]),
    // Animación stragger para las cards
    trigger('listAnimation', [
      transition( '* => *' , [
        query( ':enter' , [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger( '50ms' , [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class SearchComponent {
  // ============================================
  // TODO: VIEWCHILD MODERNOS
  // ============================================
  readonly resultsSectionRef = viewChild<ElementRef<HTMLDivElement>>('resultsSection');

  // ============================================
  // TODO: INYECCIÓN DE DEPENDENCIAS MODERNA
  // ============================================
  private readonly searchService = inject(SearchService);

  // ============================================
  // TODO: ICONOS
  // ============================================
  readonly faChevronDown: IconDefinition = faChevronDown;

  // ============================================
  // TODO: SIGNALS OPTIMIZADOS
  // ==========================================
  // # Input signal
  pageType = input<'gallery' | 'list'>('gallery'); // Tipo de página donde está el componente

  // # Internal signals
  private searchTermSignal = signal<string>('');

  // # Output signals
  searchValue = output<string>();

  // ============================================
  // TODO: COMPUTED PROPERTIES
  // ============================================
  // # Texto dinámico según contexto (Galería o Listas)
  readonly displayText = computed<{ text: string, placeholder: string }>(() => {
    const type = this.pageType();

    if (type === 'gallery') {
      return {
        text: '<span>Galería</span> y <span>Categoría</span>',
        placeholder: 'Busca algún item de tu galería...'
      }
    } else {
      return {
        text: '<span>Lista</span>',
        placeholder: 'Busca algún item de tu lista...'
      }
    }
  })

  // # Estados de búsqueda del servicio
  readonly hasResults = computed(() => this.searchService.hasResults());
  readonly searchResults = computed(() => this.searchService.searchResults());
  readonly showResultsSection = computed(() => this.searchService.showResultsSection());
  readonly resultCount = computed(() => this.searchService.resultCount());

  // # Estado del indicador de flecha
  readonly showArrow = computed(() =>
    this.hasResults() && this.searchTermSignal().trim().length > 0
  );

  // # Rotación del ícono según estado
  readonly arrowRotation = computed(() =>
    this.showResultsSection() ? 'rotate(180deg)' : 'rotate(0deg)'
  );

  // ============================================
  // TODO: GETTERS COMPUTADOS
  // ============================================
  // # Obtiene el valor actual del término de búsqueda
  get searchTerm(): string {
    return this.searchTermSignal();
  }

  // ============================================
  // TODO: MÉTODOS PÚBLICOS - FORMULARIO
  // ============================================
  // # Actualiza el término de búsqueda y emite el nuevo valor
  updateSearchTerm (event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTermSignal.set(input.value);
    this.searchService.updateSearchTerm(input.value);

    // Cerrar la sección de resultados al escribir algo nuevo
    if (this.searchService.showResultsSection()) {
      this.searchService.hideResultsSection();
    }

    // Emite el valor para que view-gallery realice la búsqueda
    this.searchValue.emit(input.value);
  }

  // # Maneja el envío del formulario
  onSubmit (event: Event): void {
    event.preventDefault();
    const term = this.searchTerm.trim();

    if (term) {
      this.searchService.startSearch();
      this.searchValue.emit(this.searchTerm);
    }
  }

  // ============================================
  // TODO: MÉTODOS PÚBLICOS - INTERACCIONES
  // ============================================
  // # Toggle de la sección de resultados
  toggleResults(): void {
    this.searchService.toggleResultsSection();

    // Scroll suave a la sección de resultados
    if (this.searchService.showResultsSection()) {
      this.scrollToResults();
    }
  }

  // # Limpiar búsqueda
  clearSearch(): void {
    this.searchTermSignal.set('');
    this.searchService.clearSearch();
    this.searchValue.emit('');
  }

  // ============================================
  // TODO: MÉTODOS PRIVADOS
  // ============================================
  // # Scroll suave a la sección de resultados
  private scrollToResults(): void {
    setTimeout(() => {
      this.resultsSectionRef()?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }
}

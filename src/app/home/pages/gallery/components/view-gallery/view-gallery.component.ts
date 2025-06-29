import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild
} from '@angular/core';

// Interfaces
import { Select } from '../../interfaces/select.interface';
import { GalleryCard } from '../../interfaces/gallery-card.interface';

// FontAwesome
import {
  faSliders,
  faChevronDown,
  IconDefinition,
  faStar,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

// Servicios
import { GalleryModalService } from '../../services/gallery-modal/gallery-modal.service';
import { DateService } from '../../../../../shared/services/date/date.service';
import { SearchService } from '../../../shared/services/search/search.service';

@Component({
  selector: 'home-view-gallery',
  standalone: false,
  templateUrl: './view-gallery.component.html',
  styleUrl: './view-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'wwlist-gallery-container',
    '[attr.aria-busy]': 'isLoading()',
    '[class.loading]': 'isLoading()',
    '[class.has-modals]': 'hasOpenModals',
    '[class.filters-collapsed]': 'activeSections().filters',
    '[class.orders-collapsed]': 'activeSections().orders',
    '[attr.data-cards-count]': 'galleryCards().length',
    'role': 'main'
  }
})
export class ViewGalleryComponent implements OnInit {
  private searchTimeout?: number;

  // ============================================
  // TODO: VIEWCHILD MODERNOS
  // ============================================
  readonly addButtonRef = viewChild<ElementRef<HTMLButtonElement>>('addButton');

  // ============================================
  // TODO: INYECCIÓN DE DEPENDENCIAS MODERNA
  // ============================================
  private readonly galleryModalService = inject(GalleryModalService);
  private readonly dateService = inject(DateService);
  private readonly searchService = inject(SearchService);

  // ============================================
  // TODO: ICONOS
  // ============================================
  readonly faSliders: IconDefinition = faSliders;
  readonly faChevronDown: IconDefinition = faChevronDown;
  readonly faStar: IconDefinition = faStar;
  readonly faPlus: IconDefinition = faPlus;

  // ============================================
  // TODO: SIGNALS OPTIMIZADOS
  // ============================================
  readonly activeSections = signal<Record<string, boolean>>({
    filters: true,
    orders: true
  });

  // # Filtros
  readonly filters = signal<Select>({
    category: {
      name: 'Categorias',
      value: '',
      options: ['Animes', 'Series', 'Películas', 'Juegos']
    },
    subcategory: {
      name: 'Subcategorías',
      value: '',
      options: ['Clásico', 'Moderno', 'Acción']
    },
    qualification: {
      name: 'Calificación',
      value: '',
      options: ['★☆☆☆☆', '★★☆☆☆', '★★★☆☆', '★★★★☆', '★★★★★']
    },
    year: {
      name: 'Año',
      value: '',
      options: []
    },
    state: {
      name: 'Estado',
      value: '',
      options: ['Completado', 'En proceso', 'En espera']
    },
    platform: {
      name: 'Plataforma',
      value: '',
      options: ['Netflix', 'Amazon', 'HBO', 'Disney+', 'Crunchyroll']
    },
    filled: {
      name: 'Completado',
      value: '',
      options: ['Sí', 'No']
    }
  });

  // # Ordenamientos
  readonly orders = signal<Select>({
    date: {
      name: 'Fecha',
      value: '',
      options: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    },
    name: {
      name: 'Nombre',
      value: '',
      options: ['A - Z', 'Z - A']
    },
    total: {
      name: 'Total',
      value: '',
      options: ['Mayor', 'Menor']
    }
  });

  // # Tarjetas de la galería
  readonly galleryCards = signal<GalleryCard[]>([
    {
      id: '1',
      name: 'Solo Leveling',
      category: 'Animes',
      subcategory: 'Acción',
      rating: 5,
      total: 32,
      seasons: 2,
      status: 'completed',
      start_date: this.currentDate(new Date()),
      platform: 'Crunchyroll',
      completed: true,
      imageUrl: 'assets/images/anime.jpg',
      imageFormats: {
        jpg: 'assets/images/anime.jpg',
        webp: 'assets/images/anime.webp',
        avif: 'assets/images/anime.avif'
      },
      linkUrl: 'https://www.crunchyroll.com/es-es/solo-leveling',
    },
    {
      id: '2',
      name: 'El Novato',
      category: 'Series',
      subcategory: 'Acción',
      rating: 4,
      total: 32,
      seasons: 2,
      status: 'in-progress',
      start_date: this.currentDate(new Date()),
      platform: 'Netflix',
      completed: false,
      imageUrl: 'assets/images/serie.jpg',
      imageFormats: {
        jpg: 'assets/images/serie.jpg',
        webp: 'assets/images/serie.webp',
        avif: 'assets/images/serie.avif'
      },
      linkUrl: 'https://www.netflix.com/',
    },
    {
      id: '3',
      name: 'Doctor Strange en el Multiverso de la Locura',
      category: 'Películas',
      subcategory: 'Acción',
      rating: 3,
      total: 1,
      seasons: 1,
      status: 'waiting',
      start_date: this.currentDate(new Date('2023-05-03')),
      platform: 'Disney+',
      completed: false,
      imageUrl: 'assets/images/movie.jpg',
      imageFormats: {
        jpg: 'assets/images/movie.jpg',
        webp: 'assets/images/movie.webp',
        avif: 'assets/images/movie.avif'
      },
      linkUrl: 'https://www.disneyplus.com/'
    }
  ]);

  readonly isLoading = signal<boolean>(true); // Carga

  // ============================================
  // TODO: COMPUTED PROPERTIES
  // ============================================
  readonly isSearching = computed(() => this.searchService.isSearching());
  readonly resultCount = computed(() => this.searchService.resultCount()); // Cantidad de resultados
  readonly searchResults = computed(() => this.searchService.searchResults()); // Resultados
  readonly sections = computed(() => ['filters', 'orders']); // Secciones activos

  // # Accion de filtros
  readonly filteredCards = computed(() => {
    const cards = this.galleryCards();
    const filterValues = this.filters();

    return cards.filter( card => {
      // Aplicar filtros activos

      // & Categoria
      if (
        filterValues['category'].value &&
        card.category !== filterValues['category'].value
      ) return false;

      // & Subcategoria
      if (
        filterValues['subcategory'].value &&
        card.subcategory !== filterValues['subcategory'].value
      ) return false;

      // & Calificación
      if (
        filterValues['qualification'].value &&
        card.rating !== (filterValues['qualification'].value.match(/★/g) || []
      ).length) return false;

      // & Año
      if (filterValues['year'].value) {
        const cardYear = this.dateService.getPeruYear(card.start_date);

        if (String(cardYear) !== filterValues['year'].value) return false;
      }

      // & Estado
      if (filterValues['state'].value) {
        const expectedCompleted = filterValues['state'].value === 'Completado';

        if (card.completed !== expectedCompleted) return false;
      }

      // & Plataforma
      if (
        filterValues['platform'].value &&
        card.platform !== filterValues['platform'].value
      ) return false;

      // & Completado
      if (filterValues['filled'].value) {
        let expectedCompleted = filterValues['filled'].value === 'Sí';

        if (expectedCompleted !== card.completed) {
          return false;
        }
      }

      return true;
    });
  });

  // # Acción de ordenamiento
  readonly sortedCards = computed(() => {
    const cards = this.filteredCards();
    const orderValues = this.orders();

    // & Ordenamiento por mes
    if (orderValues['date'].value) {
      const months = orderValues['date'].options;
      const selectedMonthIndex = months.indexOf(orderValues['date'].value) + 1; // +1 porque los meses son del 1 al 12

      return [...cards].sort((a, b) => {
        const monthA = this.dateService.getPeruMonth(a.start_date);
        const monthB = this.dateService.getPeruMonth(b.start_date);

        // Priorizar cards del mes seleccionado
        if (monthA === selectedMonthIndex && monthB !== selectedMonthIndex) return -1;
        if (monthA !== selectedMonthIndex && monthB === selectedMonthIndex) return 1;

        // Si ambos son del mismo mes o ambos no son del mes seleccionado, ordenar por fecha
        return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
      })
    }

    // & Ordenamiento por nombre
    if (orderValues['name'].value === 'A - Z') return [...cards].sort((a, b) => a.name.localeCompare(b.name));

    if (orderValues['name'].value === 'Z - A') return [...cards].sort((a, b) => b.name.localeCompare(a.name));

    // & Ordenamiento por total
    if (orderValues['total'].value === 'Mayor') return [...cards].sort((a, b) => b.total - a.total);

    if (orderValues['total'].value === 'Menor') return [...cards].sort((a, b) => a.total - b.total);

    return cards;
  });

  // # Indica los filtros que están activos
  readonly hasActiveFilters = computed(() => {
    const filterValues = this.filters();

    return Object.values(filterValues).some( filter => filter.value !== '');
  });

  // # Indica los orders que están activos
  readonly hasActiveOrders = computed(() => {
    const orderValues = this.orders();

    return Object.values(orderValues).some( order => order.value !== '');
  });

  // # Estadisticas de las tarjetas
  readonly cardsStats = computed(() => {
    const cards = this.galleryCards();

    return {
      total: cards.length,
      completed: cards.filter(card => card.completed).length,
      inProgress: cards.filter(card => card.status === 'in-progress').length,
      waiting: cards.filter(card => card.status === 'waiting').length
    };
  });

  // # Signals del modal con computed
  readonly isModalOpen = computed(() => this.galleryModalService.isModalOpen());
  readonly modalData = computed(() => this.galleryModalService.modalData());

  // ============================================
  // TODO: EFFECTS MODERNOS
  // ============================================
  constructor() {
    // # Effect para gestión de teclado
    effect((onCleanup) => {
      const handleKeydown = (event: KeyboardEvent) => {
        // Ctrl + P para nueva tarjeta
        if (event.ctrlKey && event.key === 'p') {
          event.preventDefault();
          this.onCreateNewCard();
        }

        // Escape para cerrar secciones expandidas
        if (event.key === 'Escape' && !this.isModalOpen()) {
          this.collapsAllSections();
        }
      };

      document.addEventListener('keydown', handleKeydown);

      onCleanup(() => {
        document.removeEventListener('keydown', handleKeydown);
      });
    });

    // # Effect para auto-focus en botón agregar después de cargar
    effect(() => {
      if (!this.isLoading() && this.addButtonRef()?.nativeElement) {
        const button = this.addButtonRef()!.nativeElement;

        // Auto-focus con delay para mejor UX
        setTimeout(() => {
          button.setAttribute('tabindex', '0');
        }, 100);
      }
    });

    // # Effect para logging de cambios en filtros (desarrollo)
    effect(() => {
      const stats = this.cardsStats();
      const activeFilters = this.hasActiveFilters();

      console.log('📊 Gallery Stats:', {
        total: stats.total,
        filtered: this.filteredCards().length,
        hasActiveFilters: activeFilters
      });
    });

    // # Effect para gestión de estado del modal
    effect(() => {
      const modalOpen = this.isModalOpen();
      const button = this.addButtonRef()?.nativeElement;

      if (button) {
        (modalOpen)
          ? this.prepareButtonForModal(button)
          : setTimeout(() => this.resetButtonState(button), 200); // Delay para mejor transición visual
      }
    });
  }

  // ============================================
  // TODO: LIFECYCLE HOOKS
  // ============================================
  ngOnInit(): void {
    this.loadGalleryData();

    // Actualizar opciones de años después de cargar datos
    setTimeout(() => {
      this.filters.update( current => ({
        ...current,
        year: {
          ...current['year'],
          options: this.generateYearOptions()
        }
      }));
    }, 2100);
  }

  // ============================================
  // TODO: MÉTODOS PÚBLICOS
  // ============================================
  // # Método para verificar si una card es el mes seleccionado
  isCardFromSelectedMonth (card: GalleryCard): boolean {
    const orderValues = this.orders();

    if (!orderValues['date'].value) return true; // Si no hay mes seleccionado, mostrar todas las tarjetas

    const months = orderValues['date'].options;
    const selectedMonthIndex = months.indexOf(orderValues['date'].value) + 1; // +1 porque los meses son del 1 al 12
    const cardMonth = this.dateService.getPeruMonth(card.start_date);

    return cardMonth === selectedMonthIndex;
  }

  // # Método para cargar datos de la galería (simulación de API)
  loadGalleryData(): void {
    this.isLoading.set(true);

    // Simular API call con timeout más realista
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }

  // # Método para manejar la búsqueda
  handleSearch (searchTerm: string): void {
    // Cancelar búsqueda anterior si existe
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Si no hay término, limpiar resultados inmediatamente
    if (!searchTerm.trim()) {
      this.searchService.clearSearch();
      return;
    }

    // Iniciar búsqueda
    this.searchService.startSearch();

    // Filtrar por término de búsqueda (búsqueda mejorada)
    const normalizedTerm = searchTerm.toLowerCase().trim();
    const filtered = this.galleryCards().filter( card => {
      const searchableText = [
        card.name,
        card.category,
        card.subcategory,
        card.platform,
        card.status
      ].join(' ').toLowerCase();

      return searchableText.includes(normalizedTerm);
    });

    // Actualizar resultados con debounce
    this.searchTimeout = setTimeout(() => {
      this.searchService.updateSearchResults(filtered);
    }, 300) as unknown as number;
  }

  // # Método para alternar secciones
  toggleSection(section: string): void {
    this.activeSections.update( current => ({
      ...current,
      [section]: !current[section]
    }));
  }

  // # Método para actualizar los inputs(selects) de la sección de filtros y ordenamientos
  updateSelect (section: string, value: Select): void {
    (section === 'filters')
      ? this.filters.set(value)
      : this.orders.set(value);
  }

  // # Método para limpiar todos los filtros seleccionados
  clearAllFilters(): void {
    const clearedFilters = Object.keys( this.filters() ).reduce( (acc, key) => {
      acc[key] = { ...this.filters()[key], value: '' };

      return acc;
    }, {} as Select);

    this.filters.set(clearedFilters);
  }

  // # Método para limpiar todos los ordenamientos seleccionados
  clearAllOrders(): void {
    const clearedOrders = Object.keys( this.orders() ).reduce( (acc, key) => {
      acc[key] = { ...this.orders()[key], value: '' };

      return acc;
    }, {} as Select);

    this.orders.set(clearedOrders);
  }

  // # Método para colapsar todas las secciones (sección de filtros y ordenamientos)
  collapsAllSections(): void {
    this.activeSections.set({
      filters: true,
      orders: true
    });
  }

  // # trackBy function for @for
  trackByCardId(index: number, card: GalleryCard): string {
    return card.id;
  }

  // # Fecha actual (Formato dd/MM/yyyy)
  currentDate (date: Date): string {
      return this.dateService.formatDate(date);
  }

  // # Método para generar años dinámicamente en el selector de filtros
  generateYearOptions(): string[] {
    const years = new Set<string>();
    const currentYear = this.dateService.getCurrentYear();

    // Agregar años desde los datos existentes
    this.galleryCards().forEach( card => {
      years.add(String(this.dateService.getPeruYear(card.start_date)));
    });

    // Agregar año actual si no está
    years.add(String(currentYear));

    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  }

  // ============================================
  // TODO: MÉTODOS CDK DIALOG MODERNOS
  // ============================================

  // # Método para abrir el modal de creación y edición de tarjetas
  onCreateNewCard(): void {
    if (this.isLoading()) return;

    this.galleryModalService.openCreateGalleryModal()
      .subscribe({
        next: (result) => {
          if (result) this.addNewCard(result);
        },
        error: (error) => {
          console.error('❌ Error al crear tarjeta:', error);
        }
      });
  }

  // # Método para editar una tarjeta existente
  onEditCard (card: GalleryCard): void {
    if (this.isLoading()) return;

    this.galleryModalService.openCreateGalleryModal(card)
      .subscribe({
        next: (result) => {
          if (result) this.updateCard(result);
        },
        error: (error) => {
          console.error('❌ Error al editar tarjeta:', error);
        }
      });
  }

  // # Método para eliminar una tarjeta
  onDeleteCard (cardId: string): void {
    if (this.isLoading()) return;

    const card = this.galleryCards().find(c => c.id === cardId);
    if (!card) return;

    if (confirm(`¿Estás seguro de que quieres eliminar "${card.name}"?`)) {
      this.galleryCards.update(cards =>
        cards.filter(card => card.id !== cardId)
      );
    }
  }

  // ============================================
  // TODO: GETTERS COMPUTADOS
  // ============================================
  // # Getter para verificar si hay modales abiertos
  get hasOpenModals(): boolean {
    return this.galleryModalService.hasOpenModals();
  }

  // # Getter para obtener las tarjetas ordenadas y filtradas
  get displayCards(): GalleryCard[] {
    return this.sortedCards();
  }

  // ============================================
  // TODO: MÉTODOS PRIVADOS
  // ============================================}
  // # Método privado para agregar tarjetas
  private addNewCard (card: GalleryCard): void {
    const newId = (this.galleryCards().length + 1).toString();
    const newCard = { ...card, id: newId };

    this.galleryCards.update(cards => [...cards, newCard]);
  }

  // # Método privado para actualizar una tarjeta existente
  private updateCard (updateCard: GalleryCard): void {
    this.galleryCards.update(cards =>
      cards.map( card =>
        card.id === updateCard.id ? updateCard : card
      )
    );
  }

  // # Método privado para preparar el botón para el modal
  private prepareButtonForModal (button: HTMLElement): void {
    button.classList.add('modal-open');
    button.style.pointerEvents = 'none';
    button.style.transform = 'translateZ(0)';
    button.blur();
  }

  // # Método privado para restablecer el estado del botón después de cerrar el modal
  private resetButtonState(button: HTMLElement | null): void {
    if (!button) return;

    const performReset = () => {
      button.classList.remove('modal-open');
      button.style.pointerEvents = '';
      button.style.transform = '';
      button.style.boxShadow = '';
      button.blur();
    };

    performReset();
    requestAnimationFrame(performReset);
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  input,
  output
} from '@angular/core';

// Interfaces
import { Select } from '../../../interfaces/select.interface';

@Component({
  selector: 'view-filters-orders',
  standalone: false,
  templateUrl: './view-filters-orders.component.html',
  styleUrl: './view-filters-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'wwlist-view-filters-orders',
    '[class.has-filters]': 'hasActiveFilters()',
    '[attr.data-section-type]': 'sectionType()',
    'role': 'group'
  }
})
export class ViewFiltersOrdersComponent {
  // ============================================
  // TODO: SIGNALS DE ENTRADA
  // ============================================
  readonly typeOption = input<Select>({});
  readonly activeSections = input<boolean>(false);

  // ============================================
  // TODO: SIGNALS DE SALIDA
  // ============================================
  readonly filters_orders = output<Select>();

  // ============================================
  // TODO: COMPUTED SIGNALS
  // ============================================
  readonly filterKeys = computed<string[]>(() => {
    return Object.keys(this.typeOption() || {});
  });

  readonly hasActiveFilters = computed<boolean>(() => {
    const options = this.typeOption();
    return Object.values(options).some(filter => filter.value !== '');
  });

  readonly sectionType = computed<string>(() => {
    const keys = this.filterKeys();

    // Identificar por claves típicas de filtros
    if (
      keys.includes('category') ||
      keys.includes('subcategory') ||
      keys.includes('qualification')
    )  return 'filters';

    // Identificar por claves típicas de ordenamiento
    if (
      keys.includes('date') ||
      keys.includes('name') ||
      keys.includes('total')
    ) return 'orders';

    return 'mixed';
  });

  // # Contar los selects que están con valores
  readonly activeSelectionsCount = computed<number>(() => {
    const options = this.typeOption();
    return Object.values(options).filter(opt => opt.value !== '').length;
  });

  // ============================================
  // TODO: CONSTRUCTOR Y EFFECTS
  // ============================================
  constructor() {
    // Effect para debug en desarrollo
    effect(() => {
      const count = this.activeSelectionsCount();
      const type = this.sectionType();

      if (count > 0) {
        console.log(`📊 ${type} activos:`, count);
      }
    });

    // Effect para limpiar selectores cuando se colapsa la sección
    effect(() => {
      if (!this.activeSections()) {
        // Pequeño delay para permitir que termine la animación
        setTimeout(() => this.closeAllSelects(), 300);
      }
    });
  }

  // ============================================
  // TODO: MÉTODOS PÚBLICOS
  // ============================================
  // # Colocar el valor de la opción seleccionada
  optionSelect(tipo: string, value: string): void {
    // Crear copia del objeto actual con el valor actualizado
    const updatedTypeOption: Select = {
      ...this.typeOption(),
      [tipo]: {
        ...(this.typeOption()[tipo] || { name: '', value: '', options: [] }),
        value: value
      }
    };

    // Emitir el objeto completo actualizado al componente padre
    this.filters_orders.emit(updatedTypeOption);
  }

  // # Para el @for
  trackByFilterKey(index: number, filterKey: string): string {
    return filterKey;
  }

  // ============================================
  // TODO: EVENT LISTENERS
  // ============================================
  /**
   * Detecta clics fuera de los selectores para cerrarlos
   * Escucha eventos de clic en todo el documento
   *
   * @param $event - Evento de clic del DOM
   */
  @HostListener('document:click', ['$event'])
  clickOutside($event: Event): void {
    const target = $event.target as HTMLElement;

    // Verificar si el clic fue fuera de elementos interactivos
    const isOutsideSelect = !target.closest('.select');
    const isOutsideModal = !target.closest('.gallery-modal');
    const isOutsideCdkOverlay = !target.closest('.cdk-overlay-container');

    if (isOutsideSelect && isOutsideModal && isOutsideCdkOverlay) {
      this.closeAllSelects();
    }
  }

  /**
   * Maneja el evento de tecla Escape para cerrar selectores
   *
   * @param event - Evento de teclado
   */
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    const hasOpenSelects = document.querySelector('.gallery-selects .select.active');

    if (hasOpenSelects) {
      event.preventDefault();
      this.closeAllSelects();
    }
  }

  // ============================================
  // TODO: MÉTODOS PRIVADOS
  // ============================================
  // # Cerrar selects
  private closeAllSelects(): void {
    const selectors = document.querySelectorAll('.gallery-selects .select');
    selectors.forEach((element) => element.classList.remove('active'));
  }
}

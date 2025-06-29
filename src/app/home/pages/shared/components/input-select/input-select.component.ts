import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  output,
  signal,
  viewChild
} from '@angular/core';

// Font Awesome
import {
  IconDefinition,
  faChevronDown,
  faStar,
  faCheck,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

// Interfaces
import { Select } from '../../../gallery/interfaces/select.interface';

@Component({
  selector: 'home-shared-select',
  standalone: false,
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss',
  host: {
    '[attr.aria-expanded]': 'isOpen()',
    '[attr.aria-labelledby]': 'filterKey() + "-label"',
    '[attr.aria-controls]': '"options-" + filterKey()',
    'role': 'combobox',
    '[class.select-open]': 'isOpen()'
  }
})
export class InputSelectComponent {
  // ============================================
  // TODO: VIEWCHILD MODERNO
  // ============================================
  readonly selectorRef = viewChild.required<ElementRef<HTMLElement>>('selector');

  // ============================================
  // TODO: ICONOS
  // ============================================
  readonly faChevronDown: IconDefinition = faChevronDown;
  readonly faStar: IconDefinition = faStar;
  readonly faStarEmpty: IconDefinition = faStarEmpty;
  readonly faCheck: IconDefinition = faCheck;
  readonly faXmark: IconDefinition = faXmark;

  // ============================================
  // TODO: INPUTS/OUTPUTS
  // ============================================
  readonly filterKey = input<string>('');
  readonly filterKeys = input<string[]>(['']);
  readonly typeOption = input<Select>({});
  readonly index = input<number>(0);

  readonly filters_orders = output<string>();
  readonly onBlur = output<void>();
  readonly addCustomOption = output<{ fieldName: string, value: string }>();

  // ============================================
  // TODO: SIGNALS
  // ============================================
  readonly isOpen = signal(false);
  readonly hasUserInteracted = signal(false);
  readonly showCustomInput = signal(false);
  readonly customInputValue = signal('');

  // ============================================
  // TODO: COMPUTED PROPERTIES
  // ============================================
  readonly enhancedOptions = computed(() => {
    const currentOptions = this.typeOption()[this.filterKey()]?.options || [];
    const allowCustom = this.typeOption()[this.filterKey()]?.allowCustom || false;

    return allowCustom ? [...currentOptions, '+ Agregar nuevo'] : currentOptions;
  });

  // ============================================
  // TODO: EFFECTS MODERNOS
  // ============================================
  constructor() {
    // Effect para manejar listeners de documento
    effect(() => {
      if (this.isOpen()) {
        this.addDocumentListeners();
      } else {
        this.removeDocumentListeners();
      }
    });

    // Effect para sincronizar estado con DOM
    effect(() => {
      const element = this.selectorRef()?.nativeElement;

      if (element) {
        if (this.isOpen()) {
          element.classList.add('active');
        } else {
          element.classList.remove('active');
        }
      }
    });
  }

  // ============================================
  // TODO: GESTIÓN DE EVENTOS DE DOCUMENTO
  // ============================================
  private documentClickListener?: (event: Event) => void;
  private documentKeyListener?: (event: KeyboardEvent) => void;

  // # Detectar clicks fuera y teclas
  private addDocumentListeners(): void {
    if (!this.documentClickListener) {
      this.documentClickListener = (event: Event) => this.handleDocumentClick(event);

      document.addEventListener('click', this.documentClickListener);
    }

    if (!this.documentKeyListener) {
      this.documentKeyListener = (event: KeyboardEvent) => this.handleDocumentKey(event);

      document.addEventListener('keydown', this.documentKeyListener);
    }
  }

  // # Remover los Listener de clicks y teclas
  private removeDocumentListeners(): void {
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);

      this.documentClickListener = undefined;
    }

    if (this.documentKeyListener) {
      document.removeEventListener('keydown', this.documentKeyListener);

      this.documentKeyListener = undefined;
    }
  }

  // # Maneja los eventos del click de los documentos
  private handleDocumentClick (event: Event): void {
    const clickedElement = event.target as HTMLElement;
    const selectElement = this.selectorRef()?.nativeElement;

    if (selectElement && !selectElement.contains(clickedElement)) {
      this.closeSelect();

      this.onBlur.emit();
    }
  }

  // # Maneja los eventos de teclado de los documentos, en este caso el espacio
  private handleDocumentKey (event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeSelect();
      this.onBlur.emit();
    }
  }

  // ============================================
  // TODO: MÉTODOS PÚBLICOS
  // ============================================
  // # Para cerrar o abrir los select
  toggleActive (event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.closeAllOtherSelects();

    if (this.isOpen()) {
      this.closeSelect();
      this.onBlur.emit();
    } else {
      this.openSelect();
    }

    // Prevenir comportamiento del input
    const input = this.selectorRef()?.nativeElement.querySelector('input');
    if (input) {
      input.addEventListener("mousedown", (ev) => ev.preventDefault());
    }
  }

  // # Manejo de la selección de opciones
  handleOptionClick (event: Event, option: string): void {
    event.preventDefault();
    event.stopPropagation();

    if (option === '+ Agregar nuevo') {
      this.showCustomInput.set(true);
      this.hasUserInteracted.set(true);
      return;
    }

    this.selectOption(option);
    this.closeSelect();
  }

  // # Actualizar el valor del input
  onCustomInputChange (event: Event): void {
    const target = event.target as HTMLInputElement;
    this.customInputValue.set(target.value);
  }

  // # Crear nueva opción
  confirmCustomOption(): void {
    const newValue = this.customInputValue().trim();
    if (newValue) {
      this.addCustomOption.emit({
        fieldName: this.filterKey(),
        value: newValue
      });
      this.resetCustomInput();
    }
  }

  // # Cancelar para crear nueva opción
  cancelCustomOption(): void {
    this.resetCustomInput();
  }

  // ============================================
  // TODO: UTILIDADES
  // ============================================
  // # Detección de las estrellas
  isStarRating (option: string): boolean {
    return option.includes('★') || option.includes('☆');
  }

  // # Generar arrays para loops
  getStarArray (count: number): number[] {
    return Array(count).fill(0).map((_, index) => index);
  }

  // # Contador de estrellas llenas
  countFullStars (option: string): number {
    return (option.match(/★/g) || []).length;
  }

  // ============================================
  // TODO: MÉTODOS PRIVADOS
  // ============================================
  // # Abre el select
  private openSelect(): void {
    this.isOpen.set(true);
    this.hasUserInteracted.set(true);
  }

  // # Cierra el select
  private closeSelect(): void {
    this.isOpen.set(false);
    this.resetCustomInput();
  }

  // # Escoge alguna opción
  private selectOption (value: string): void {
    this.hasUserInteracted.set(true);
    this.filters_orders.emit(value);
  }

  // # Reinicia el input sin emitir eventos
  private resetCustomInput(): void {
    this.showCustomInput.set(false);
    this.customInputValue.set('');
  }

  // # Cierra otros selectores
  private closeAllOtherSelects(): void {
    document.querySelectorAll('.select.active').forEach((el) => {
      const element = el as HTMLElement;

      if (element !== this.selectorRef()?.nativeElement) {
        element.classList.remove('active');
      }
    });
  }
}

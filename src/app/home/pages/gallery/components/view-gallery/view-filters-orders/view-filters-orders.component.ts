// ChangeDetectionStrategy - Estrategia de detección de cambios para optimizar el rendimiento
// Component - Decorador que define un componente en Angular
// computed - Para manejar estado reactivo (Angular v17+)
// HostListener - Decorador que permite escuchar eventos del DOM
// input - Función para defiir propiedades de entrada (Angular v17+)
// output - Función para definir eventos de salida (nueva API de señales en Angular 17+)
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  output
} from '@angular/core';

// Interfaces
import { Select } from '../../../interfaces/select.interface';

// FontAwesome
import {
  faChevronDown,
  faStar,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

/*
  changeDetection: ChangeDetectionStrategy.OnPush:
  Optimización clave que hace que Angular solo verifique este componente cuando:

    Cambian las entradas de referencia (no valores primitivos).
    El componente emite eventos.
    Se dispara la detección de cambios manualmente.
*/
@Component({
  selector: 'view-filters-orders',
  standalone: false,

  templateUrl: './view-filters-orders.component.html',
  styleUrl: './view-filters-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush // Añadido para optimización
})
export class ViewFiltersOrdersComponent {
  // Icono
  // readonly .- Define al atributo como lectura para prevenir modificaciones accidentales
  readonly faChevronDown: IconDefinition = faChevronDown;
    readonly faStar: IconDefinition = faStar;
    readonly faStarEmpty: IconDefinition = faStarEmpty;

  // Signals para recibir y emitir datos
  typeOption = input<Select>({}); // Señal de entrada que recibe un objeto tipo Select (configuración de filtros)
  filters_orders = output<Select>(); // Señal de salida que emite un objeto tipo Select cuando se seleccionan filtros
  activeSections = input<boolean>(false); //  Señal de entrada booleana que controla si las secciones están activas (visible=false)

  // Método que extrae y devuelve todas las claves del objeto typeOption
  // Incluye || {} como fallback para evitar errores si typeOption es undefined
  /*
    computed - Crea una señal que se recalcula automáticamente cuando cambian sus dependencias.
    En este caso, devuelve un array de claves del objeto typeOption.
    Esto permite que el componente reaccione a cambios en typeOption sin necesidad de lógica adicional.
    Se utiliza para renderizar dinámicamente los selectores en la plantilla HTML.
  */
  readonly filterKeys = computed<string[]>(() => {
    return Object.keys(this.typeOption() || {});
  })

  // TODO: Método para detectar si una opción contiene estrellas Unicode
  isStarRating (option: string): boolean {
    return option.includes('★') || option.includes('☆');
  }

  // TODO: Método para contar estrellas llenas
  countFullStars (option: string): number {
    // option.match(/★/g) - Si hay coincidencias: Devuelve un array con todas las coincidencias encontradas
    // /★/: Busca exactamente el carácter de estrella llena (★)
    // /g: El modificador global hace que busque todas las coincidencias, no solo la primera
    // Por ejemplo, para "★★★☆☆" devolvería ['★', '★', '★']
    return (option.match(/★/g) || []).length;
  }

  // TODO: Método auxiliar para generar arrays para las estrellas
  // count: number: Un número entero que indica cuántos elementos deseamos en el array
  getStarArray(count: number): number[] {
    // Array(count): Crea un array con count espacios vacíos
    // fill(0): Rellena todos los espacios del array con el valor 0
    // map((_, index) => index): Transforma cada elemento del array
    // El primer parámetro _ (guion bajo) indica que no usamos el valor actual (los ceros)
    // El segundo parámetro index es la posición del elemento en el array (0, 1, 2, ...)
    // Ejemplo: Para count = 3, el resultado es [0, 1, 2]
    return Array(count).fill(0).map((_, index) => index);
  }

  // TODO: Método que maneja la selección de una opción dentro de un selector
  optionSelect (tipo: string, value: string) {
    // Obtiene el valor actual de la señal typeOption o un objeto vacío si es undefined
    const currentTypeOption = this.typeOption() || {};

    // Crea un nuevo objeto (no modifica el original) usando el operador spread (...)
    // Asegura una estructura correcta con un objeto por defecto si no existe la clave
    const updatedTypeOption = {
      ...currentTypeOption,
      // Para la clave específica ([tipo]), mantiene todas las propiedades existentes pero actualiza value
      [tipo]: {
        ...(currentTypeOption[tipo] || { value: '', options: [] }),
        value: value
      }
    };

    // Emite el objeto actualizado para informar al componente padre del cambio
    this.filters_orders.emit(updatedTypeOption);
  }

  // TODO: Método que maneja el clic en un selector para mostrar/ocultar las opciones
  toggleActive($event: Event): void {
    let element = $event.currentTarget as HTMLElement; // Captura el elemento que recibió el clic (currentTarget)
    let input = element.querySelector('input');

    // Previene el comportamiento predeterminado del evento mousedown en el input
    if (input) {
      input.addEventListener("mousedown", (ev) => ev.preventDefault());
    }

    // Cerrar todos los selectores abiertos excepto el actual
    this.closeAllSelectsExcept(element);

    // Alternamos la clase 'active' del select actual
    element.classList.toggle('active');
  }

  // TODO: Cerrar todos los selectores abiertos excepto el elemento que manden
  private closeAllSelectsExcept(otherElement: HTMLElement): void {
    document.querySelectorAll('.select').forEach((el) => {
      if (el !== otherElement) {
        el.classList.remove('active');
      }
    });
  }

  // TODO: Detecta si se hace click fuera del select y remueve la clase active
  // Decorador @HostListener('document:click'... escucha eventos de clic en todo el documento
  @HostListener('document:click', ['$event'])
  clickOutside($event: Event): void {
    // ev.target - Elemento que se le dio click
    // closest - Busca el elemento más cercano que cumpla con la condicion dada
    if (!($event.target as HTMLElement).closest('.select')) {
      // Si el clic fue fuera de todos los selectores, cierra todos los selectores abiertos
      this.closeAllSelects();
    };
  }

  // TODO: Método para cerrar todos los selectores
  private closeAllSelects(): void {
    document.querySelectorAll('.select').forEach((el) => {
      el.classList.remove('active');
    });
  }

  // TODO: Método para seguimiento de elementos en bucles @
  // Ayuda a Angular a identificar qué elementos del DOM deben recrearse cuando cambia la lista.
  trackByFilterKey(index: number, filterKey: string): string {
    return filterKey;
  }
}

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

  // TODO: Método que maneja la selección de una opción dentro de un selector
  optionSelect (tipo: string, value: string) {
    let updatedTypeOption = {
      ...this.typeOption(),
      // Para la clave específica ([tipo]), mantiene todas las propiedades existentes pero actualiza value
      [tipo]: {
        ...(this.typeOption()[tipo] || { value: '', options: [] }),
        value: value
      }
    };

    // Emite el objeto actualizado para informar al componente padre del cambio
    this.filters_orders.emit(updatedTypeOption);
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

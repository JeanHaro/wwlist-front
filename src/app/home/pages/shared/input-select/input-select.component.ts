import { Component, inject, input, OnInit, output } from '@angular/core';

// Font Awesome
import {
  faChevronDown,
  IconDefinition,
  faStar
} from '@fortawesome/free-solid-svg-icons';

import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

// Interfaces
import { Select } from '../../gallery/interfaces/select.interface';

@Component({
  selector: 'home-shared-select',
  standalone: false,
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss'
})
export class InputSelectComponent {
  // Iconos
  readonly faChevronDown: IconDefinition = faChevronDown;
  readonly faStar: IconDefinition = faStar;
  readonly faStarEmpty: IconDefinition = faStarEmpty;

  // Inputs
  filterKey = input<string>('');
  filterKeys = input<string[]>(['']);
  typeOption = input<Select>({});
  index = input<number>(0);
  filters_orders = output<string>();

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

  // TODO: Método que maneja la selección de una opción dentro de un selector
  optionSelect (value: string) {
    // Emite el valor de la opción actualizada
    this.filters_orders.emit(value);
  }

  // TODO: Método para detectar si una opción contiene estrellas Unicode
  isStarRating (option: string): boolean {
    return option.includes('★') || option.includes('☆');
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

  // TODO: Método para contar estrellas llenas
  countFullStars (option: string): number {
    // option.match(/★/g) - Si hay coincidencias: Devuelve un array con todas las coincidencias encontradas
    // /★/: Busca exactamente el carácter de estrella llena (★)
    // /g: El modificador global hace que busque todas las coincidencias, no solo la primera
    // Por ejemplo, para "★★★☆☆" devolvería ['★', '★', '★']
    return (option.match(/★/g) || []).length;
  }
}

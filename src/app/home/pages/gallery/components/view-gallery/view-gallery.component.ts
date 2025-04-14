import { ChangeDetectionStrategy, signal,  Component } from '@angular/core';

// Interfaces
import { Select } from '../../interfaces/select.interface';

// FontAwesome
import {
  faSliders,
  faChevronDown,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

/*
  OnPush mejora significativamente el rendimiento al ejecutar la detección de cambios solo cuando:

    Cambian las referencias de las entradas (no valores primitivos)
    Se dispara un evento dentro del componente
    Se utiliza explícitamente markForCheck()
*/
@Component({
  selector: 'home-view-gallery',
  standalone: false,
  templateUrl: './view-gallery.component.html',
  styleUrl: './view-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewGalleryComponent {

  // Iconos
  readonly faSliders: IconDefinition = faSliders;
  readonly faChevronDown: IconDefinition = faChevronDown;

  // Estados
  // signals para reactividad
  // signal<Record<string, boolean>>: Crea un estado reactivo tipado
  // Record<string, boolean>: Definición de tipo para un objeto con claves de string y valores booleanos
  activeSections = signal<Record<string, boolean>>({
    filters: true,
    orders: true
  });

  // Opciones de filtros y ordenamientos
  filters = signal<Select>({
    category: { name: 'Categorias', value: '', options: ['Acción', 'Drama', 'Comedia'] },
    subcategory: { name: 'Subcategorías', value: '', options: ['Clásico', 'Moderno'] },
    qualification: { name: 'Calificación', value: '', options: [
      '★☆☆☆☆',
      '★★☆☆☆',
      '★★★☆☆',
      '★★★★☆',
      '★★★★★'
    ]},
    year: { name: 'Año',  value: '', options: ['2021', '2022', '2023'] },
    state: { name: 'Estado', value: '', options: ['Activo', 'Inactivo'] },
    platform: { name: 'Plataforma', value: '', options: ['Netflix', 'Amazon', 'HBO'] },
    filled: { name: 'Completado', value: '', options: ['Sí', 'No'] }
  });

  orders= signal<Select>({
    date: { name: 'Fecha', value: '', options: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] },
    name: { name: 'Nombre', value: '', options: ['A-Z', 'Z - A'] },
    others: { name: 'Otros', value: '', options: ['Estado', 'Completado'] }
  })

  // Array de secciones para el bucle @for
  readonly sections = ['filters', 'orders'];

   // Métodos
   // Esconder los selects
  toggleSection(section: string) {
    // activeSections.update(): Método de signals para actualizar el estado de forma inmutable
    this.activeSections.update(
      current => ({
        ...current, // Usa el operador spread (...) para crear un nuevo objeto
        // [section] permite usar una variable como nombre de propiedad
        [section]: !current[section]
      })
    );
  }

  // Actualizar opciones usando signals
  updateSelect(section: string, value: Select) {
    // signal.set(): Reemplaza completamente el valor anterior con el nuevo valor
    (section === "filters") ? this.filters.set(value) : this.orders.set(value);
  }
}

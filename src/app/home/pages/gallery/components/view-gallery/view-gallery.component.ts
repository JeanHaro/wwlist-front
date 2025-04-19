import { ChangeDetectionStrategy, signal,  Component } from '@angular/core';

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
  readonly faStar: IconDefinition = faStar;
  readonly faPlus: IconDefinition = faPlus;

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

  // Cards
  galleryCards = signal<GalleryCard[]>([
    {
      id: '1',
      name: 'Solo Leveling',
      category: 'Animes',
      subcategory: 'Acción',
      rating: 5,
      year: '2023',
      status: 'completed', // Estado: Completado
      platform: 'Crunchyroll',
      completed: true,
      imageUrl: 'assets/images/anime.jpg',
      linkUrl: 'https://www.crunchyroll.com/es-es/solo-leveling',
    },
    {
      id: '2',
      name: 'El Novato',
      category: 'Series',
      subcategory: 'Acción',
      rating: 4,
      year: '2023',
      status: 'in-progress', // Estado: Completado
      platform: 'Netflix',
      completed: false,
      imageUrl: 'assets/images/serie.jpg',
      linkUrl: 'https://www.netflix.com/',
    },
    {
      id: '3',
      name: 'Doctor Strange en el Multiverso de la Locura',
      category: 'Películas',
      subcategory: 'Acción',
      rating: 3,
      year: '2025',
      status: 'waiting', // Estado: Completado
      platform: 'Disney+',
      completed: false,
      imageUrl: 'assets/images/movie.jpg',
      linkUrl: 'https://www.disneyplus.com/'
    }
  ])

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

  // Ayuda a Angular a identificar qué elementos del DOM deben recrearse cuando cambia la lista.
  trackByCardId (index: number, card: GalleryCard): string {
    return card.id;
  }
}

import { ChangeDetectionStrategy, signal,  Component, OnInit } from '@angular/core';

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
export class ViewGalleryComponent implements OnInit {

  // Iconos
  readonly faSliders: IconDefinition = faSliders;
  readonly faChevronDown: IconDefinition = faChevronDown;
  readonly faStar: IconDefinition = faStar;
  readonly faPlus: IconDefinition = faPlus;

  // TODO: Estados de visibilidad de las secciones (true = colapsado)
  // signals para reactividad
  // signal<Record<string, boolean>>: Crea un estado reactivo tipado
  // Record<string, boolean>: Definición de tipo para un objeto con claves de string y valores booleanos
  activeSections = signal<Record<string, boolean>>({
    filters: true,
    orders: true
  });

  // TODO: Opciones de filtros y ordenamientos
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
    year: { name: 'Año',  value: '', options: ['2021', '2022', '2023', '2024', '2025'] },
    state: { name: 'Estado', value: '', options: ['Completado', 'En proceso', 'En espera'] },
    platform: { name: 'Plataforma', value: '', options: ['Netflix', 'Amazon', 'HBO', 'Disney+', 'Crunchyroll'] },
    filled: { name: 'Completado', value: '', options: ['Sí', 'No'] }
  });

  orders= signal<Select>({
    date: { name: 'Fecha', value: '', options: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] },
    name: { name: 'Nombre', value: '', options: ['A - Z', 'Z - A'] },
    others: { name: 'Otros', value: '', options: ['Estado', 'Completado'] }
  })

  // TODO: Array de secciones para el bucle @for
  readonly sections = ['filters', 'orders'];

  // TODO: Datos de tarjetas de galería
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
      year: '2023',
      status: 'in-progress', // Estado: Completado
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
      year: '2025',
      status: 'waiting', // Estado: Completado
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
  ])

  // Estado de carga
  isLoading = signal<boolean>(true);

  // Cuando inicia la página
  ngOnInit(): void {
    this.loadGalleryData();
  }

  // Cargar la galeria
  loadGalleryData(): void {
    // Establecer carga a true
    this.isLoading.set(true);

    // Simular API (se reemplaza con tu llamada de servicio real)
    setTimeout(() => {
      this.isLoading.set(false);
    }, 3000);
  }

  // Métodos
  // TODO: Implementamos la lógica de búsqueda específica para cada contexto
  handleSearch (searchTerm: string): void {
    console.log(`Búsqueda: ${searchTerm}`)
  }

   // TODO: Alterna la visibilidad de una sección específica (filtros u ordenamiento)
  toggleSection (section: string): void {
    // activeSections.update(): Método de signals para actualizar el estado de forma inmutable
    this.activeSections.update(
      current => ({
        ...current, // Usa el operador spread (...) para crear un nuevo objeto y mantener las propiedades existentes
        // [section] permite usar una variable como nombre de propiedad
        [section]: !current[section]
      })
    );
  }

  // TODO: Actualiza las opciones de filtros u ordenamiento según la sección
  updateSelect (section: string, value: Select): void {
    // signal.set(): Reemplaza completamente el valor anterior con el nuevo valor
    (section === "filters") ? this.filters.set(value) : this.orders.set(value);
  }

  /**
   * Función de seguimiento para optimizar el renderizado de listas
   * Ayuda a Angular a identificar qué elementos han cambiado
   * @param index Índice del elemento en el array
   * @param card Elemento del array
   * @returns Identificador único del elemento
   */
  trackByCardId (index: number, card: GalleryCard): string {
    return card.id;
  }
}

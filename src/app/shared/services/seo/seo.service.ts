import { inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

// RxJs
import { filter, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private metaService = inject(Meta);

  init() {
    // Escuchar eventos de navegación
    /* this.router.events -> Es un Observable que emite eventos durante la navegación del
    Router de Angular, estos eventos incluyen cuando se inicia una navegación, cuando
    se cancela, cuando se resuelven guardias/resolvers y cuando se completa (NavigationEnd) */
    // pipe - es un método de RxJs que permite encadenar múltiples operadores para manipular los datos emitidos por el observable
    this.router.events.pipe(
      // filter - es un operador de Rxjs que filtra los valores emitidos por un observable según una condición
      // event instanceof NavigationEnd - Esta condición verifica si el evento e mitido es una instancia de NavigationEnd
      /* NavigationEnd - Es un tipo de evento que se emite cuando la navegación se ha completado exitosamente, significa que
      solo procesamos los metadatos cuando la navegación ha finalizado completamente */
      filter( event => event instanceof NavigationEnd ),
      // map - es un operador que transforma cada valor emitido por el Observable anterior
      /* this.activatedRoute - En lugar de usar el evento de navegación, nos interesa la ruta actual activada, este map simplemente
      sustituye el evento por la instancia de ActivatedRoute actual */
      map(() => this.activatedRoute ),
      map( route => {
        // El bucle navega a través del árbol de rutas hasta encontrar la ruta hija más profunda
        /* route.firstChild - Las rutas pueden tener una estructura jerárquica (ruta padre con rutas hijas). La propiedad firstChild apunta a
        la primera ruta hija de una ruta, si una ruta no tiene hijos firstChild será null */
        while(route.firstChild) route = route.firstChild;

        return route;
      }),
      // route.outlet - un outlet es un lugar en la plantilla en donde se puede renderizar el contenido de una ruta
      // El valor primary se refiere al outlet principal
      // Angular puede tener múltiples outlet en una misma vista (por ejemplo, para mostrar contenido auxiliar como sidebars o modales)
      // Este filtro asegura que solo procesamos la ruta del outlet principal, ignorando cualquier outlet auxliar
      filter( route => route.outlet === 'primary' ),
      // mergeMap - es un operador de RxJS que convierte un valor en un nuevo Observable y luego aplana el resultado
      /* route.data - Cada ruta en Angular puede tener un objeto data asociado que contiene metadaos personalizados, en este caso
      a ese objeto data que contiene (entre otras cosas) los metaTags que queremos aplicar */
      mergeMap( route => route.data )
      // subscribe - es un método para escuchar los valores emitidos por el observable
      // data - es el objeto de datos que se ha obtenido de la ruta actual
    ).subscribe( data => {
      // Actualizar meta tags si existen en la ruta
      // data['metaTags'] - verifica si la ruta actual tiene metadatos SEO definidos en su configuración
      if (data['metaTags']) {
        // Limpiar tags anteriores para evitar duplicados
        /* this.metaService - es una instancia del servicio Meta de Angular que proporciona una API para manipular las etiquetas
        meta en el head del documento */
        // removeTag - es un método para eliminar etiquetas meta basadas en un selector, esto se basa para evitar duplicados, ya que estamos por agregar nuevas
        // name=description - es una etiqueta meta estándar que utilizan los motores de búsqueda para mostrar una descripcín de la página en los resultados de búsqueda
        this.metaService.removeTag('name="description"');
        this.metaService.removeTag('name="keywords"');

        // Open Graph
        /* property=og - esta es una etiqueta meta de Open Graph que es un protocolo utilizado principalmente por Facebook y otras
        redes para extraer información cuando se comparte un enlace */
        this.metaService.removeTag('property="og:title"');
        this.metaService.removeTag('property="og:description"');
        this.metaService.removeTag('property="og:url"');
        this.metaService.removeTag('property="og:image"');
        this.metaService.removeTag('property="og:type"');

        // Twitter Cards
        this.metaService.removeTag('name="twitter:card"');
        this.metaService.removeTag('name="twitter:title"');
        this.metaService.removeTag('name="twitter:description"');
        this.metaService.removeTag('name="twitter:image"');

        // Añadir nuevos tags
        // this.metaService.addTag(tag) - Este método agrega una nueva etiqueta meta al head del documento basado en el objeto tag
        data['metaTags'].forEach(
          (tag: { name?: string, property?: string, content: string }) => this.metaService.addTag(tag)
        );

      } else {
        // Meta tags por defecto si no se especifican en la ruta
        this.setDefaultMetaTags();
      }
    });
  }

  private setDefaultMetaTags() {
    this.metaService.updateTag({ name: 'description', content: 'W&WList - Organiza tu entretenimiento y tus planes en un solo lugar. Visualiza lo que viste y planifica lo que harás.' });
    this.metaService.updateTag({ name: 'keywords', content: 'wwlist, listas, planificación, galería, organización personal, películas, animes, tareas, calendario, seguimiento de actividades' });

    // Open Graph Tags
    this.metaService.updateTag({ property: 'og:title', content: 'W&WList - Galería y listas para tu vida diaria' });
    this.metaService.updateTag({ property: 'og:description', content: 'W&WList combina una galería multimedia y listas de planificación con calendario para organizar lo que ves y lo que haces.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://wwlist.com' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:image', content: 'assets/images/logo.png' });

    // Twitter Cards
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'W&WList - Gakería y listas para tu vida diaria' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'W&WList combina una galería multimedia y listas de planificación con calendario para organizar lo que ves y lo que haces.' });
    this.metaService.updateTag({ name: 'twitter:image', content: 'assets/images/logo.png' })
  }
}

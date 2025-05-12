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
    this.router.events.pipe(
      filter( event => event instanceof NavigationEnd ),
      map(() => this.activatedRoute ),
      map( route => {
        while(route.firstChild) route = route.firstChild;

        return route;
      }),
      filter( route => route.outlet === 'primary' ),
      mergeMap( route => route.data )
    ).subscribe( data => {
      // Actualizar meta tags si existen en la ruta
      if (data['metaTags']) {
        // Limpiar tags anteriores para evitar duplicados
        this.metaService.removeTag('name="description"');
        this.metaService.removeTag('name="keywords"');

        // Open Graph
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

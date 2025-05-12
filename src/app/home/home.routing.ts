import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'gallery',
        pathMatch: 'full'
      },
      {
        path: 'gallery',
        loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryModule),
        title: 'Galería', // Esto se mostrará como "W&W List - Galería"
        data: {
          metaTags: [
            { name: 'description', content: 'Explora tu galería personalizada de películas, series, animes y música en tarjetas visuales. Guarda, organiza y marca lo que has visto o deseas ver con W&WList.' },
            { name: 'keywords', content: 'W&WList, wish and watch list, lista de películas, lista de animes, música para ver, películas vistas, animes favoritos, galería multimedia, lista de deseos, películas por ver, gestor de contenido visto, organización de entretenimiento, card gallery, galería de tarjetas, películas favoritas, animes vistos, lista personal, seguimiento de series, qué ver después, historial de entretenimiento' },

            // Open Graph
            { property: 'og:title', content: 'W&WList - Tu lista de deseos y vistos' },
            { property: 'og:description', content: 'Descubre y organiza tus películas, animes y música favoritos en una galería visual. Guarda lo que viste y lo que aún deseas ver con W&WList.' },
            { property: 'og:url', content: 'https://wwlist.com/gallery' },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: 'assets/images/logo.png' },

            // Twitter Cards
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'W&WList - Tu galería multimedia' },
            { name: 'twitter:description', content: 'Descubre y organiza tus películas, animes y música favoritos en una galería visual.' },
            { name: 'twitter:image', content: 'assets/images/logo.png' }
          ],
          preloadPriority: 'critical'
        }
      },
      {
        path: 'list',
        loadChildren: () => import('./pages/list/list.module').then(m => m.ListModule),
        title: 'Lista de tareas',
        data: {
          metaTags: [
            { name: 'description', content: 'Organiza tus tareas, ideas y pendientes con listas personalizadas. Clasifica por hacer, en espera o completado con W&W List.' },
            { name: 'keywords', content: 'listas, tareas, planificación personal, cosas por hacer, to-do, organización de actividades, productividad, pendientes, en espera, completado, por hacer, seguimiento de tareas, wwlist, w&wlist'  },

            // Open Graph
            { property: 'og:title', content: 'Listas de W&WList - Organiza tus tareas y proyectos' },
            { property: 'og:description', content: 'Crea, organiza y sigue tus listas de tareas, proyectos y actividades con W&WList.' },
            { property: 'og:url', content: 'https://wwlist.com/list' },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: 'assets/images/logo.png' },

            // Twitter Cards
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'Listas de W&WList - Organiza tus tareas y proyectos' },
            { name: 'twitter:description', content: 'Crea, organiza y sigue tus listas de tareas, proyectos y actividades con W&WList.' },
            { name: 'twitter:image', content: 'assets/images/logo.png' }
          ],
          preloadPriority: 'high'
        }
      },
      {
        path: 'calendar',
        loadComponent: () => import('./pages/calendar/calendar.component').then(c => c.CalendarComponent),
        title: 'Calendario',
        data: {
          metaTags: [
            { name: 'description', content: 'Consulta tu calendario personal con las fechas de lo que has visto o hecho. Organiza y visualiza tu historial de actividades en W&WList.' },
            { name: 'keywords', content: 'calendario, historial, fechas, planificación, actividades completadas, cosas por hacer, organización, wwlist, w&wlist' },

            // Open Graph
            { property: 'og:title', content: 'Calendario de W&WList - Visualiza tu historial y planificación' },
            { property: 'og:description', content: 'Mira qué días completaste tareas, viste películas o tienes cosas pendientes. Tu calendario personal con todo lo que hiciste y harás.' },
            { property: 'og:url', content: 'https://wwlist.com/calendar' },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: 'assets/images/logo.png' },

            // Twitter Cards
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'Calendario de W&WList - Visualiza tu historial' },
            { name: 'twitter:description', content: 'Mira qué días completaste tareas, viste películas o tienes cosas pendientes.' },
            { name: 'twitter:image', content: 'assets/images/logo.png' }
          ]
        }
      },
      {
        path: 'dates',
        loadComponent: () => import('./pages/dates/dates.component').then(c => c.DatesComponent),
        title: 'Tiempo de actividad',
        data: {
          metaTags: [
            { name: 'description', content: 'Consulta cuánto tiempo te toma completar actividades, ver películas o terminar tareas. Analiza tu ritmo con W&WList.' },
            { name: 'keywords', content: 'tiempo, duración, seguimiento, fechas, productividad, actividades completadas, análisis de tareas, organización personal, wwlist, w&wlist' },

            // Open Graph
            { property: 'og:title', content: 'W&WList - Tiempos de actividad y seguimiento' },
            { property: 'og:description', content: 'Explora cuánto te demoras en completar tus tareas o ver contenido. Lleva un registro detallado con W&WList.' },
            { property: 'og:url', content: 'https://wwlist.com/dates' },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: 'assets/images/logo.png' },

            // Twitter Cards
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'W&WList - Tiempos de actividad y seguimiento' },
            { name: 'twitter:description', content: 'Explora cuánto te demoras en completar tus tareas o ver contenido. Lleva un registro detallado con W&WList.' },
            { name: 'twitter:image', content: 'assets/images/logo.png' }
          ]
        }
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule {}

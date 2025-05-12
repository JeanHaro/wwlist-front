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
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent),
        title: 'Inicia sesión',
        data: {
          metaTags: [
            { name: 'description', content: 'Accede a tu cuenta de W&WList para gestionar tus listas, galerías y actividades personalizadas.' },
            { name: 'keywords', content: 'iniciar sesión, login, acceso, cuenta, wwlist, w&wlist, listas, galería, organización personal' },

            // Open Graph
            { property: 'og:title', content: 'Inicia sesión en W&WList' },
            { property: 'og:description', content: 'Ingresa a tu cuenta para seguir organizando tus listas, tareas y contenido favorito en W&WList.' },
            { property: 'og:url', content: 'https://wwlist.com/auth/login' },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: 'assets/images/logo.png' },

            // Twitter Cards
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'Inicia sesión en W&WList' },
            { name: 'twitter:description', content: 'Ingresa a tu cuenta para seguir organizando tus listas, tareas y contenido favorito en W&WList.' },
            { name: 'twitter:image', content: 'assets/images/logo.png' }
          ],
          preloadPriority: 'high'
        }
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent),
        title: 'Regístrate',
        data: {
          metaTags: [
            { name: 'description', content: 'Crea tu cuenta en W&WList y comienza a organizar tus listas, tareas, galerías y tiempos de actividad de forma sencilla.' },
            { name: 'keywords', content: 'registrarse, crear cuenta, registro, nueva cuenta, wwlist, w&wlist, listas, organización personal, galería' },

            // Open Graph
            { property: 'og:title', content: 'Regístrate en W&WList' },
            { property: 'og:description', content: 'Únete a W&WList para gestionar tus listas, tareas y contenido personal en un solo lugar.' },
            { property: 'og:url', content: 'https://wwlist.com/auth/register' },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: 'assets/images/logo.png' },

            // Twitter Cards
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'Regístrate en W&WList' },
            { name: 'twitter:description', content: 'Únete a W&WList para gestionar tus listas, tareas y contenido personal en un solo lugar.' },
            { name: 'twitter:image', content: 'assets/images/logo.png' }
          ]}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {}

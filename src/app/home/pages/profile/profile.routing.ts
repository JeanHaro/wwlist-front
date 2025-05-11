// profile-routing.module.ts
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        loadComponent: () => import('./components/info/info.component').then(c => c.InfoComponent),
        title: 'Información de usuario',
        data: {
          metaTags: [
            { name: 'description', content: 'Consulta y actualiza tu información personal en W&WList. Mantén tu cuenta segura y al día.' },
            { name: 'keywords', content: 'información personal, cuenta, usuario, editar perfil, seguridad, configuración, wwlist, w&wlist' },
            { property: 'og:title', content: 'Información de tu cuenta - W&W List' },
            { property: 'og:description', content: 'Revisa y modifica tu información personal en tu cuenta de W&W List de manera segura.' },
            { property: 'og:url', content: 'https://wwlist.com/profile/info' }
          ]
        }
      },
      {
        path: 'analytics',
        loadComponent: () => import('./components/analytics/analytics.component').then(c => c.AnalyticsComponent),
        title: 'Analytics de usuario',
        data: {
          metaTags: [
            { name: 'description', content: 'Consulta tus estadísticas personales en W&WList: listas creadas, tareas completadas, hábitos y más.' },
            { name: 'keywords', content: 'analytics, estadísticas, actividad, usuario, listas, tareas, rendimiento, wwlist, w&wlist' },
            { property: 'og:title', content: 'Tus estadísticas en W&WList' },
            { property: 'og:description', content: 'Explora tu progreso y hábitos de organización con los analytics de W&WList.' },
            { property: 'og:url', content: 'https://wwlist.com/profile/analytics' }
          ]
        }
      },
      {
        path: 'settings',
        loadComponent: () => import('./components/settings/settings.component').then(c => c.SettingsComponent),
        title: 'Configuración de usuario',
        data: {
          metaTags: [
            { name: 'description', content: 'Personaliza tu experiencia en W&WList desde la configuración de tu cuenta: notificaciones, privacidad y más.' },
            { name: 'keywords', content: 'configuración, ajustes, preferencias, cuenta, usuario, privacidad, wwlist, w&wlist' },
            { property: 'og:title', content: 'Configura tu cuenta en W&WList' },
            { property: 'og:description', content: 'Modifica tus preferencias y ajusta tu cuenta a tu medida en W&WList.' },
            { property: 'og:url', content: 'https://wwlist.com/profile/settings' }
          ]
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule {}


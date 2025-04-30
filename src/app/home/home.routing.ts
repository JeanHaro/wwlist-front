import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { LayoutComponent } from './layout/layout.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { DatesComponent } from './pages/dates/dates.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'gallery', pathMatch: 'full' },
      {
        path: 'gallery',
        loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./pages/list/list.module').then(m => m.ListModule)
      },
      {
        path: 'calendar',
        loadComponent: () => import('./pages/calendar/calendar.component').then(c => c.CalendarComponent)
      },
      {
        path: 'dates',
        loadComponent: () => import('./pages/dates/dates.component').then(c => c.DatesComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(c => c.ProfileComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule {}

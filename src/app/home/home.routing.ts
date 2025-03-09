import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { LayoutComponent } from './layout/layout.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { DatesComponent } from './pages/dates/dates.component';

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
      { path: 'calendar', component: CalendarComponent },
      { path: 'dates', component: DatesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule {}

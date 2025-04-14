import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// -> Layout
import { LayoutComponent } from './layout/layout.component';
// Componentes
import { HeaderComponent } from './layout/components/header/header.component';
import { FooterComponent } from './layout/components/footer/footer.component';

// Pages
import { CalendarComponent } from './pages/calendar/calendar.component';
import { DatesComponent } from './pages/dates/dates.component';
import { ProfileComponent } from './pages/profile/profile.component';
// Shared Pages
import { SearchComponent } from './pages/shared/search/search.component';

// Rutas
import { HomeRoutingModule } from './home.routing';

// Modulos
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    CalendarComponent,
    DatesComponent,
    SearchComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  exports: [
    SearchComponent,
    SharedModule
  ]
})
export class HomeModule { }

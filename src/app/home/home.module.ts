import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// -> Layout
import { LayoutComponent } from './layout/layout.component';
// -> Components Layout
import { HeaderComponent } from './layout/components/header/header.component';
import { FooterComponent } from './layout/components/footer/footer.component';

// Pages
import { CalendarComponent } from './pages/calendar/calendar.component';
import { DatesComponent } from './pages/dates/dates.component';
// Shared Pages
import { SearchComponent } from './pages/shared/search/search.component';

@NgModule({
  declarations: [
    LayoutComponent,
    CalendarComponent,
    DatesComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }

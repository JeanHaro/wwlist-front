import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { DatesComponent } from './pages/dates/dates.component';
import { ListComponent } from './pages/list/list.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { SearchComponent } from './pages/shared/search/search.component';



@NgModule({
  declarations: [
    LayoutComponent,
    CalendarComponent,
    DatesComponent,
    ListComponent,
    GalleryComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }

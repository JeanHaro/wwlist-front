import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { ViewGalleryComponent } from './components/view-gallery/view-gallery.component';
import { ViewFiltersOrdersComponent } from './components/view-gallery/view-filters-orders/view-filters-orders.component';
// -> Modals
import { CreateGalleryComponent } from './modals/create-gallery/create-gallery.component';
import { EditGalleryComponent } from './modals/edit-gallery/edit-gallery.component';

// Routing
import { GalleryRoutingModule } from './gallery.routing';
import { HomeModule } from "../../home.module";

@NgModule({
  declarations: [
    CreateGalleryComponent,
    ViewGalleryComponent,
    EditGalleryComponent,
    ViewFiltersOrdersComponent,
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    HomeModule
]
})
export class GalleryModule { }

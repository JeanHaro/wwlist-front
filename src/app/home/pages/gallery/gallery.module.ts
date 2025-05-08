import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

// Componentes
import { ViewGalleryComponent } from './components/view-gallery/view-gallery.component';
import { ViewFiltersOrdersComponent } from './components/view-gallery/view-filters-orders/view-filters-orders.component';
import { ViewGalleryCardComponent } from './components/view-gallery/view-gallery-card/view-gallery-card.component';
// -> Modals
import { CreateGalleryComponent } from './modals/create-gallery/create-gallery.component';
import { EditGalleryComponent } from './modals/edit-gallery/edit-gallery.component';

// Routing
import { GalleryRoutingModule } from './gallery.routing';

// Modulos
import { HomeModule } from '../../home.module';
@NgModule({
  declarations: [
    ViewGalleryComponent,
    ViewFiltersOrdersComponent,
    ViewGalleryCardComponent,
    CreateGalleryComponent,
    EditGalleryComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    GalleryRoutingModule,
    HomeModule
  ],
})
export class GalleryModule { }

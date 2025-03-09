import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { CreateGalleryComponent } from './components/create-gallery/create-gallery.component';
import { ViewGalleryComponent } from './components/view-gallery/view-gallery.component';
// -> Modals
import { EditGalleryComponent } from './modals/edit-gallery/edit-gallery.component';

// Routing
import { GalleryRoutingModule } from './gallery.routing';
import { HomeModule } from "../../home.module";

@NgModule({
  declarations: [
    CreateGalleryComponent,
    ViewGalleryComponent,
    EditGalleryComponent,
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    HomeModule
]
})
export class GalleryModule { }

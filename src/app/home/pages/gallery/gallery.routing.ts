import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ViewGalleryComponent } from './components/view-gallery/view-gallery.component';
import { CreateGalleryComponent } from './components/create-gallery/create-gallery.component';

const routes: Routes = [
  { path: '', component: ViewGalleryComponent },
  { path: 'create', component: CreateGalleryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GalleryRoutingModule {}

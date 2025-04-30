import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ViewGalleryComponent } from './components/view-gallery/view-gallery.component';

const routes: Routes = [
  { path: '', component: ViewGalleryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GalleryRoutingModule {}

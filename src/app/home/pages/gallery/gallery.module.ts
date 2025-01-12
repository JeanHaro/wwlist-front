import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGalleryComponent } from './components/create-gallery/create-gallery.component';
import { ViewGalleryComponent } from './components/view-gallery/view-gallery.component';
import { EditGalleryComponent } from './components/edit-gallery/edit-gallery.component';
import { ModalDeleteComponent } from './components/edit-gallery/modals/modal-delete/modal-delete.component';
import { ModalSaveComponent } from './components/edit-gallery/modals/modal-save/modal-save.component';



@NgModule({
  declarations: [
    CreateGalleryComponent,
    ViewGalleryComponent,
    EditGalleryComponent,
    ModalDeleteComponent,
    ModalSaveComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GalleryModule { }

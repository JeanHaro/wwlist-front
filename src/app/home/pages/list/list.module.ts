import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateListComponent } from './components/create-list/create-list.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { ViewListComponent } from './components/view-list/view-list.component';
import { ModalCreateBasicComponent } from './components/view-list/modals/modal-create-basic/modal-create-basic.component';
import { ModalSaveComponent } from './components/edit-list/modals/modal-save/modal-save.component';
import { ModalDeleteComponent } from './components/edit-list/modals/modal-delete/modal-delete.component';



@NgModule({
  declarations: [
    CreateListComponent,
    EditListComponent,
    ViewListComponent,
    ModalCreateBasicComponent,
    ModalSaveComponent,
    ModalDeleteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ListModule { }

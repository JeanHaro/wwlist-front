import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { ViewListComponent } from './components/view-list/view-list.component';
// -> Modals
import { CreateListComponent } from './modals/create-list/create-list.component';
import { EditListComponent } from './modals/edit-list/edit-list.component';

// Routing
import { ListRoutingModule } from './list.routing';

@NgModule({
  declarations: [
    ViewListComponent,
    CreateListComponent,
    EditListComponent,
  ],
  imports: [
    CommonModule,
    ListRoutingModule
  ]
})
export class ListModule { }

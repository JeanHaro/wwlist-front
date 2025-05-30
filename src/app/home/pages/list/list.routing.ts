import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ViewListComponent } from './components/view-list/view-list.component';

const routes: Routes = [
  {
    path: '',
    component: ViewListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ListRoutingModule {}

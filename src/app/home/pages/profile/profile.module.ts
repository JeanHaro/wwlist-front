import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { ProfileComponent } from './profile.component';

// Rutas
import { ProfileRoutingModule } from './profile.routing';
@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }

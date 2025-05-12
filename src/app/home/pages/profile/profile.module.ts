import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { ProfileComponent } from './profile.component';

// Preload Quicklink
import { QuicklinkModule } from 'ngx-quicklink';
// Rutas
import { ProfileRoutingModule } from './profile.routing';
@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    QuicklinkModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }

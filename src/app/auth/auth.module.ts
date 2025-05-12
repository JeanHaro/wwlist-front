import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { LayoutComponent } from './layout/layout.component';

// Preload Quicklink
import { QuicklinkModule } from 'ngx-quicklink';
// Routing
import { AuthRoutingModule } from './auth.routing';
@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    QuicklinkModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }

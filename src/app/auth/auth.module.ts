import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { LayoutComponent } from './layout/layout.component';

// Routing
import { AuthRoutingModule } from './auth.routing';
@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }

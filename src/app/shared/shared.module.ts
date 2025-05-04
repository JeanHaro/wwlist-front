import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FaIconComponent
  ],
  exports: [
    FaIconComponent
  ]
})
export class SharedModule { }

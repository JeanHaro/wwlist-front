import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class SharedModule { }

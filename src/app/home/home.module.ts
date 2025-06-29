import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// -> Layout
import { LayoutComponent } from './layout/layout.component';
// Componentes
import { HeaderComponent } from './layout/components/header/header.component';
import { FooterComponent } from './layout/components/footer/footer.component';

// Pages
// Shared Pages
import { SearchComponent } from './pages/shared/components/search/search.component';
import { InputSelectComponent } from './pages/shared/components/input-select/input-select.component';

// Rutas
import { HomeRoutingModule } from './home.routing';

// Modulos
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    InputSelectComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    HomeRoutingModule,
    SharedModule,
  ],
  exports: [
    SharedModule,
    ReactiveFormsModule,
    SearchComponent,
    InputSelectComponent
  ]
})
export class HomeModule { }

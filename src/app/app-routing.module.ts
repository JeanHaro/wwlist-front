import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Preload
import { PriorityPreloadingStrategy } from './shared/strategies/priority-preloading/priority-preloading.strategy';

// Componentes
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: {
      preloadPriority: 'critical'
    }
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    component: NopagefoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        preloadingStrategy: PriorityPreloadingStrategy, // Aquí se configura la estrategia
        scrollPositionRestoration: 'enabled' // Restaura el scroll en la posición que estabas cuando le das click al botón de atras/delante del navegador
      }
    )
  ],
  providers: [PriorityPreloadingStrategy], // Proporciona la estrategia
  exports: [RouterModule]
})
export class AppRoutingModule { }

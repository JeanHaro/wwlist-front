import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Preload
import { HybridPreloadingStrategy } from './shared/strategies/hybrid-preloading/hybrid-preloading.strategy';

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
        preloadingStrategy: HybridPreloadingStrategy, // Aquí se configura la estrategia
        scrollPositionRestoration: 'enabled'
      }
    )
  ],
  providers: [HybridPreloadingStrategy], // Proporciona la estrategia
  exports: [RouterModule]
})
export class AppRoutingModule { }

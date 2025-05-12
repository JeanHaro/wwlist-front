import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { RouterModule, TitleStrategy } from '@angular/router';

// Componentes
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

// Preload
import { QuicklinkModule } from 'ngx-quicklink';
// Rutas
import { AppRoutingModule } from './app-routing.module';

// Modulos
import { ServiceWorkerModule } from '@angular/service-worker';

// Servicios y estrategias
import { SeoService } from './shared/services/seo/seo.service';
import { CustomTitleStrategy } from './shared/strategies/custom-title/custom-title-strategy.strategy';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    QuicklinkModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    Meta,
    SeoService,
    { provide: TitleStrategy, useClass: CustomTitleStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

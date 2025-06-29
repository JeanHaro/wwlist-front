import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, TitleStrategy } from '@angular/router';

// Cdk
import { DialogModule } from '@angular/cdk/dialog';

// Componentes
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

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
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    // ServiceWorkerModule - Proporciona soporte para PWA en aplicaciones Angular, son scripts que se ejecutan en segundo plano
    // Permite (carga offline, caché de recursos para mejorar rendimiento, notificaciones push, actualizaciones en segundo plano)
    // register - este metodo registra un script de service worker en el navegador
    /* ngsw-worker.ks - es el archivo Service Worker generado por Angular. Este archivo contiene toda la lógica necesaria para
    implementar las funcionalidades de PWA */
    ServiceWorkerModule.register('ngsw-worker.js', {
      // enabled: !isDevMode() - Esta opción determina si el Service Worker debe activarse o no
      enabled: !isDevMode(), // isDevMode() - es una función de Angular que devuelve true si la aplicación está en modo desarrollo
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      // registrationStrategy: 'registerWhenStable:30000' - Esta opción define cuando debe registrarse el Service Worker
      registrationStrategy: 'registerWhenStable:30000' // Este valor específico significa registra el Service Worker cuando la aplicación se estabilice o después de 30 segundos
    }),
    DialogModule
  ],
  // providers - son una parte fundamental del sistema de inyección de dependencias de Angular
  // Estos le dicen a Angular como crear o entregar una dependencia cuando un componente o servicio la solicita
  // Los providers solo se registran a nivel del módulo y estarán disponibles para toda la aplicación o para un módulo específico
  providers: [
    Meta, // Serivicio para manipular etiquetas meta en el head para que este disponible en toda la aplicación
    SeoService,
    // provide: TitleStrategy - indica que token o identificador se esta registrando
    // useClass - Especifica que clase concreta debe usar Angular cuando alguien solicite el token TitleStrategy
    // Es decir, cuando alguien pida TitleStrategy dale una instancia CustomTitleStrategy
    { provide: TitleStrategy, useClass: CustomTitleStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { inject, Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";
import { QuicklinkStrategy } from 'ngx-quicklink';

@Injectable({
  providedIn: 'root'
})
export class HybridPreloadingStrategy implements PreloadingStrategy {
  private quicklinkStrategy = inject(QuicklinkStrategy);

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Verificar condiciones de red
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && (connection.saveData || connection.effectiveType !== '4g');

    // Precargar siempre rutas críticas independientemente de si son visibles
    if (route.data?.['preloadPriority'] === 'critical') {
      return load();
    }

    // En conexiones lentas, no precargar nada mas
    if (isSlowConnection) {
      return of(null);
    }

    // Rutas prioritarias: precargar siempre en conexiones rápidas
    if (route.data?.['preloadPriority'] === 'high') {
      return load();
    }

    // Para el resto, usar QuickLink (precarga enlaces visibles)
    return this.quicklinkStrategy.preload(route, load);
  }
}

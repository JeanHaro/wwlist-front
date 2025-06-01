import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PriorityPreloadingStrategy implements PreloadingStrategy {
  // route: Route - es un objeto que representa la definición de la ruta de Angular, contiene toda la información como path, component, redirectTo, etc
  // load: () => - es una función que cuando se invoca carga el modulo de la ruta, es un observable porque la carga de modulos es asincrona
  // el resultado Observable<any> - debe devolver un observable que indique si se debe precargar el módulo o no, si devuelve otro tipo de observable que no ejecuta load, el modulo no se precarga
  preload (route: Route, load: () => Observable<any>): Observable<any> {
    // Verificar condiciones de red
    // navigator - es un objeto del navegador que proporciona información sobre el agente de usuario
    // .connection - es parte de la API Network Information, que no está completamente estandarizada
    // as any - es un casting de TS para evitar errores de compilación ya que TS no reconoce automáticamente la propiedad connection en todos los navegadores
    const connection = (navigator as any).connection;

    // connection.saveData - Es true cuando el usuario ha activado el modo de ahorro de datos en su dispositivo
    // connection.effectiveType !== '4g' - Comprueba si la conexión es más lenta que 4g
    const isSlowConnection = connection && (connection.saveData || connection.effectiveType !== '4g');

    // Precargar si la ruta es marcada como rutas críticas independientemente de si son visibles
    // load() . ejecuta la función que carga el módulo, iniciando la precarga
    if (route.data?.['preloadPriority'] === 'critical') {
      return load();
    }

    // En conexiones lentas, no precargar nada mas
    if (isSlowConnection) {
      return of(null); // of(null) - es una función de RxJS que crea un Observable que emite el valor null, para que no se precargue el modulo
    }

    // Rutas prioritarias: precargar siempre en conexiones rápidas
    if (route.data?.['preloadPriority'] === 'high') {
      return load();
    }

    // Para el resto no se precargará 
    return of(null);
  }
}

// Title - es un servicio de Angular que proporciona métodos para manipular el título del documento HTML
// RouterStateSnapshot - es una clase que representa el estado del router es un momento específico, contiene toda la información sobre la URL actual y las rutas activadas
// TitleStrategy - Es una clase abstracta que define la estrategia para manejar el título de la página, es la estrategia que da Angular por defecto
import { inject, Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";

// extends TitleStrategy - significa que CustomTitleStrategy hereda de la case abstracta TitleStrategy, lo estamos extendiendo su funcionalidad para personalizarla según las necesidades
@Injectable()
export class CustomTitleStrategy extends TitleStrategy {

  private readonly title = inject(Title);

  /* super() - Llama al constructor de la clase padre TitleStrategy, es necesario porque estamos extendiendo una clase y debemos asegurarnos de que la
  inicialización de la case padre se realice correctamente */
  constructor() {
    super();
  }

  // override - Es una palabra clave que indica explícitamente que estamos sobrescribiendo un método de la clase padre
  // updateTitle (routerState: RouterStateSnapshot) - Este método se llama automáticamente por el router de Angular cada vez que hay un cambio de ruta
  // Se recibe como parámetro un objeto RouterStateSnapshot que contiene toda la información sobre el estado actual de la navegación
  override updateTitle (routerState: RouterStateSnapshot): void {
    // routerState - el estado actual del router, incluyendo la URL, los parámetros y las rutas activadas
    // this.buildTitle(routerState) - buildTitle método heredado de TitleStrategy para extraer el título de la configuración de la ruta actual
    const title = this.buildTitle(routerState);

    // this.title.setTitle() - Utiliza el servicio Title inyectando para establecer el titulo del documento HTML
    (title) ? this.title.setTitle(`W&WList - ${title}` ) : this.title.setTitle('W&WList')
  }
}

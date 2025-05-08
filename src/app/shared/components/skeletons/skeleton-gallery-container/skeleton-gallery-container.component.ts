import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';

@Component({
  selector: 'skeleton-gallery-container',
  standalone: false,
  templateUrl: './skeleton-gallery-container.component.html',
  styleUrl: './skeleton-gallery-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonGalleryContainerComponent {
  count = input<number>(6);

  // TODO: Generar un array de elementos para iterar en el template
  readonly items = computed(() => {
    return Array(this.count()).fill(0).map((_, index) => index)
  })

  /* TODO: Función de seguimiento para optimizar el renderizado de listas
    index . indice del elemento en el array
    item - elemento del array
    returns identificador único del elemento
  */
  trackByFn (index: number, item: number): number {
    return item;
  }

}

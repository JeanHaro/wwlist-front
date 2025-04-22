// ElementRef - Permite acceder y manipular elementos del DOM
// ViewChild - Decorador para acceder a elementos referenciados en la plantilla.
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  ViewChild
} from '@angular/core';

import {
  faStar,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

// Interfaces
import { GalleryCard } from '../../../interfaces/gallery-card.interface';
import { CardTransform, TiltSettings3D } from '../../../interfaces/tilt-transform-settings.interface';

@Component({
  selector: 'view-gallery-card',
  standalone: false,
  templateUrl: './view-gallery-card.component.html',
  styleUrl: './view-gallery-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ViewGalleryCardComponent {
  // Iconos
  readonly faStar: IconDefinition = faStar;

  // Referencia al elemento DOM de la tarjeta
  // Permite acceder y manipular directamente el elemento DOM para aplicar transformaciones 3D.
  @ViewChild('cardElement') cardElement: ElementRef | undefined;

  // TODO: Signals para recibir datos de la tarjeta
  cardData = input<GalleryCard | null>(null);

  // TODO: Variables para controlar la rotación de la tarjeta
  private readonly tiltSettings: TiltSettings3D = {
    maxRotation: 15, // Rotación máxima en grados
    perspective: 1000, // Perspectiva 3D
    scale: 1.05, // Escala al hacer hover
    transitionSpeed: '1s', // Velocidad de transicion
    easing: 'cubic-bezier(0.03, 0.98, 0.52, 0.99)' // La curva de Bézier proporciona una aceleración y desaceleración natural.
  }

  // TODO: Almacena el estado actual de la tarjeta
  // Se actualiza basado en la posición del ratón y se aplica mediante CSS.
  private cardTransform: CardTransform = {
    rotateX: 0,
    rotateY: 0,
    scale: 1
  }

  // TODO: Mapeo para los estados con clases y textos
  private readonly stateMap = {
    'completed': { class: 'completed', text: 'Completado' },
    'waiting': { class: 'waiting', text: 'En espera' },
    'in-progress': { class: 'in-progress', text: 'En proceso' }
  }

  // TODO: Obtiene la información de estado (clase CSS y texto) basado en el status de la tarjeta
  getStateInfo(): { class: string, text: string } {
    const status = this.cardData()?.status; // Estados

    return status ? this.stateMap[status] : { class: '', text: '' }
  }

  // TODO: Método para manejar el movimiento del mouse sobre la tarjeta para el efecto 3D
  onMouseMove (event: MouseEvent) {
    if (!this.cardElement) return;

    const card = this.cardElement.nativeElement;
    const cardRect = card.getBoundingClientRect(); // Obtiene las dimensiones y posición de la tarjeta.

    // Calcular la posición relativa del mouse dentro de la tarjeta
    const mouseX = event.clientX - cardRect.left; // Posición X del ratón relativa a la tarjeta
    const mouseY = event.clientY - cardRect.top; // Posición Y del ratón relativa a la tarjeta

    // Normalizar la posición para un control preciso (convertir a valores entre -1 y 1)
    const normalizedX = (mouseX / cardRect.width) * 2 - 1;
    const normalizedY = (mouseY / cardRect.height) * 2 - 1;

    // Calcular la rotación basada en la posición del mouse
    // Invertimos el eje Y para que la rotación sea natural (el mouse arriba rota hacia arriba)
    this.cardTransform = {
      rotateX: -normalizedY * this.tiltSettings.maxRotation, // Rotación en el eje X (arriba/abajo)
      rotateY: normalizedX * this.tiltSettings.maxRotation, // Rotación en el eje Y (izquierda/derecha)
      scale: this.tiltSettings.scale
    };

    // Aplicar la transformación a la tarjeta
    this.updateCardTransform(card);
  }

  // TODO: Método para restablecer la posición cuando el mouse sale de la tarjeta
  onMouseLeave(): void {
    if (!this.cardElement) return;

    // Restablecer transformación
    this.cardTransform = {
      rotateX: 0,
      rotateY: 0,
      scale: 1
    };

    // Aplicar la transformación a la tarjeta
    this.updateCardTransform(this.cardElement.nativeElement);
  }

  // TODO: Método para aplicar la transformación CSS al elemento DOM
  private updateCardTransform (element: HTMLElement): void {
    const { rotateX, rotateY, scale } = this.cardTransform;

    // Construir la cadena de transformación CSS
    const transform = `
      perspective(${this.tiltSettings.perspective}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(${scale}, ${scale}, ${scale})
    `;

    // requestAnimationFrame - Optimiza el rendimiento sincronizando las actualizaciones visuales con el ciclo de repintado del navegador.
    requestAnimationFrame(() => {
      // Aplicar la transformación
      element.style.transform = transform;

      // Aplicar la transición
      element.style.transition = `transform ${this.tiltSettings.transitionSpeed} ${this.tiltSettings.easing}`
    })
  }
}

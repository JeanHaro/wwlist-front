// ElementRef - Permite acceder y manipular elementos del DOM
// ViewChild - Decorador para acceder a elementos referenciados en la plantilla.
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';

import {
  faStar,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

// Interfaces
import { GalleryCard } from '../../../interfaces/gallery-card.interface';
import { CardTransform, TiltSettings3D } from '../../../interfaces/tilt-transform-settings.interface';

// Types
type CardState = 'completed' | 'waiting' | 'in-progress';

interface StateInfo {
  class: string;
  text: string;
}

@Component({
  selector: 'view-gallery-card',
  standalone: false,
  templateUrl: './view-gallery-card.component.html',
  styleUrl: './view-gallery-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})

export class ViewGalleryCardComponent {
  // ============================================
  // TODO: VIEWCHILD MODERNO
  // ============================================
  // Permite acceder y manipular directamente el elemento DOM para aplicar transformaciones 3D.
  private readonly cardElement = viewChild<ElementRef<HTMLDivElement>>('cardElement');

  // ============================================
  // TODO: ICONOS
  // ============================================
  readonly faStar: IconDefinition = faStar;

  // ============================================
  // TODO: SIGNALS DE ENTRADA
  // ============================================
  // # Signals para recibir datos de la tarjeta
  cardData = input<GalleryCard | null>(null);
  // Input para indicar si la card está deshabilitada
  isDisabled = input<boolean>(false);

  // ============================================
  // TODO: SIGNALS INTERNOS
  // ============================================
  // # Almacena el estado actual de la tarjeta
  // Se actualiza basado en la posición del ratón y se aplica mediante CSS.
  private readonly cardTransform = signal<CardTransform>({
    rotateX: 0,
    rotateY: 0,
    scale: 1
  });

  // ============================================
  // TODO: CONFIGURACIÓN
  // ============================================
  // # Variables para controlar la rotación de la tarjeta
  private readonly tiltSettings: Readonly<TiltSettings3D> = {
    maxRotation: 15, // Rotación máxima en grados
    perspective: 1000, // Perspectiva 3D
    scale: 1.05, // Escala al hacer hover
    transitionSpeed: '1s', // Velocidad de transicion
    easing: 'cubic-bezier(0.03, 0.98, 0.52, 0.99)' // La curva de Bézier proporciona una aceleración y desaceleración natural.
  } as const;


  // # Mapeo para los estados con clases y textos
  private readonly stateMap: Readonly<Record<CardState, StateInfo>> = {
    'completed': { class: 'completed', text: 'Completado' },
    'waiting': { class: 'waiting', text: 'En espera' },
    'in-progress': { class: 'in-progress', text: 'En proceso' }
  } as const;

  // ============================================
  // TODO: COMPUTED SIGNALS
  // ============================================
  // # Obtiene la información de estado (clase CSS y texto) basado en el status de la tarjeta
  readonly stateInfo = computed<StateInfo>(() => {
    const status = this.cardData()?.status as CardState | undefined;
    return status ? this.stateMap[status] : { class: '', text: '' };
  });

  // # Detectar si la imagen es base64
  readonly isBase64Image = computed<boolean>(() => {
    const url = this.cardData()?.imageUrl;
    return url ? url.startsWith('data:image/') : false;
  });

  readonly hasOptimizedImages = computed<boolean>(() => {
    return !!(this.cardData()?.imageFormats && !this.isBase64Image());
  });

  readonly displayName = computed<string>(() => {
    const name = this.cardData()?.name || '';
    return name.length > 20 ? `${name.slice(0, 20)}...` : name;
  });

  // # Método para aplicar la transformación CSS al elemento DOM
  readonly transformStyle = computed<string>(() => {
    const { rotateX, rotateY, scale } = this.cardTransform();
    return `
      perspective(${this.tiltSettings.perspective}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(${scale}, ${scale}, ${scale})
    `.trim();
  });

    // ============================================
  // TODO: EFFECTS
  // ============================================
  private readonly transformEffect = effect(() => {
    const element = this.cardElement()?.nativeElement;
    if (!element) return;

    const transform = this.transformStyle();

    // Usar requestAnimationFrame para optimizar el rendimiento
    requestAnimationFrame(() => {
      element.style.transform = transform;
      element.style.transition = `transform ${this.tiltSettings.transitionSpeed} ${this.tiltSettings.easing}`;
    });
  });

  // ============================================
  // TODO: MÉTODOS DE INTERACCIÓN
  // ============================================
  // # Método para manejar el movimiento del mouse sobre la tarjeta para el efecto 3D
  onMouseMove (event: MouseEvent): void {
    const element = this.cardElement()?.nativeElement;
    if (!element || this.isDisabled()) return;

    const rect = element.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Normalizar posición (-1 a 1)
    const normalizedX = (mouseX / rect.width) * 2 - 1;
    const normalizedY = (mouseY / rect.height) * 2 - 1;

    // Actualizar transformación
    this.cardTransform.set({
      rotateX: -normalizedY * this.tiltSettings.maxRotation,
      rotateY: normalizedX * this.tiltSettings.maxRotation,
      scale: this.tiltSettings.scale
    });
  }

  // # Método para restablecer la posición cuando el mouse sale de la tarjeta
  onMouseLeave(): void {
    if (this.isDisabled()) return;

    // Restablecer transformación
    this.cardTransform.set({
      rotateX: 0,
      rotateY: 0,
      scale: 1
    });
  }
}

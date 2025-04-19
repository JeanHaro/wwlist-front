import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import {
  faStar,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

// Interfaces
import { GalleryCard } from '../../../interfaces/gallery-card.interface';

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

  // Signals para recibir datos de la tarjeta
  cardData = input<GalleryCard | null>(null);

  // Mapeo de estados con clases y textos
  private readonly stateMap = {
    'completed': { class: 'completed', text: 'Completado' },
    'waiting': { class: 'waiting', text: 'En espera' },
    'in-progress': { class: 'in-progress', text: 'En proceso' }
  }

  // Acceder al mapeo para obtener clase y texto
  getStateInfo() {
    const status = this.cardData()?.status; // Estados

    return status ? this.stateMap[status] : { class: '', text: '' }
  }
}

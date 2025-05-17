import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal
} from '@angular/core';

// FontAwesome
import {
  IconDefinition,
  faSquareFacebook,
  faSquareInstagram,
  faSquareGithub,
  faAngular,
  faNode,
} from '@fortawesome/free-brands-svg-icons';

import {
  faSun,
  faMoon
} from '@fortawesome/free-solid-svg-icons'

// Servicios
import { ThemeService } from '../../../../shared/services/theme/theme.service';

@Component({
  selector: 'home-footer',
  standalone: false,

  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  // Iconos
  readonly faSquareFacebook: IconDefinition = faSquareFacebook;
  readonly faSquareInstagram: IconDefinition = faSquareInstagram;
  readonly faSquareGithub: IconDefinition = faSquareGithub;
  readonly faAngular: IconDefinition = faAngular;
  readonly faNode: IconDefinition = faNode;
  readonly faSun: IconDefinition = faSun;
  readonly faMoon: IconDefinition = faMoon;

  readonly year = new Date().getFullYear();
  
  // Convertir a signal
  isDarkTheme = signal<boolean>(false);

  // Servicios
  private themeService = inject(ThemeService);

  constructor() {
    // Sincronizar con el theme service usando effect
    effect(() => {
      this.isDarkTheme.set(this.themeService.darkMode$());
    })
  }

  toggleTheme() {
    this.themeService.toggleDarkmode();
  }
}

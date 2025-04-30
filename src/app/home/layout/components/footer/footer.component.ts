import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
export class FooterComponent implements OnInit, OnDestroy {
  // Iconos
  readonly faSquareFacebook: IconDefinition = faSquareFacebook;
  readonly faSquareInstagram: IconDefinition = faSquareInstagram;
  readonly faSquareGithub: IconDefinition = faSquareGithub;
  readonly faAngular: IconDefinition = faAngular;
  readonly faNode: IconDefinition = faNode;
  readonly faSun: IconDefinition = faSun;
  readonly faMoon: IconDefinition = faMoon;

  readonly year = new Date().getFullYear();
  private themeSubscription!: Subscription;

  isDarkTheme: boolean = false;

  // Servicios
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.themeSubscription = this.themeService.darkMode$.subscribe(
      isDark => this.isDarkTheme = isDark
    );
  }

  toggleTheme() {
    this.themeService.toggleDarkmode();
  }

  ngOnDestroy(): void {
      if (this.themeSubscription) this.themeSubscription.unsubscribe();
  }
}

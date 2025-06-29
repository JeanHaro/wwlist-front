import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

// FontAwesome
import {
  faSquareFacebook,
  faSquareInstagram,
  faSquareGithub,
  faAngular,
  faNode,
} from '@fortawesome/free-brands-svg-icons';

import {
  faSun,
  faMoon,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons'

// Interfaces
interface SocialLink {
  key: 'facebook' | 'instagram' | 'github';
  url: string;
  label: string;
}

interface TechLink {
  key: 'angular' | 'node';
  label: string;
}

interface NavigationLink {
  route: string;
  label: string;
}

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
  // ============================================
  // TODO: INYECCIÓN DE DEPENDENCIAS
  // ============================================
  private readonly themeService = inject(ThemeService);

  // ============================================
  // TODO: ICONOS
  // ============================================
  readonly socialIcons = {
    facebook: faSquareFacebook,
    instagram: faSquareInstagram,
    github: faSquareGithub
  } as const;

  readonly techIcons = {
    angular: faAngular,
    node: faNode
  } as const;

  readonly themeIcons = {
    sun: faSun,
    moon: faMoon
  } as const;

  // ============================================
  // TODO: DATOS ESTRUCTURADOS PARA @for
  // ============================================
  readonly socialLinks = signal<SocialLink[]>([
    { key: 'facebook', url: 'https://facebook.com/wwlist', label: 'Visitar Facebook de W%W List' },
    { key: 'instagram', url: 'https://instagram.com/wwlist', label: 'Visitar Instagram de W&W List' },
    { key: 'github', url: 'https://github.com/jeanHaro/wwlist', label: 'Ver código en Github' }
  ]);

  readonly techLinks = signal<TechLink[]>([
    { key: 'angular', label: 'Desarrollado con Angular' },
    { key: 'node', label: 'Backend con Node.js' }
  ]);

  readonly navigationLinks = signal<NavigationLink[]>([
    { route: '/gallery', label: 'Cards' },
    { route: '/list', label: 'Lista' },
    { route: '/calendar', label: 'Calendario' },
    { route: '/dates', label: 'Fechas' },
    { route: '/profile', label: 'Perfil' }
  ])

  // ============================================
  // TODO: ESTADO REACTIVO OPTIMIZADO
  // ============================================
  readonly year = new Date().getFullYear();

  // Usar computed en lugar de effect para mejor performance
  readonly isDarkTheme = computed(() => this.themeService.darkMode$());
  readonly currentThemeIcon = computed(() =>
    this.isDarkTheme() ? this.themeIcons.sun : this.themeIcons.moon
  )

  // ============================================
  // TODO: MÉTODOS PÚBLICOS
  // ============================================
  // # Para cambiar el tema
  toggleTheme(): void {
    this.themeService.toggleDarkmode();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewChild,
} from '@angular/core';

import { Router } from '@angular/router';

// FontAwesome
import {
  IconDefinition
} from '@fortawesome/fontawesome-svg-core';

import {
  faList,
  faArrowRight,
  faUser,
  faUserPlus,
  faChevronDown,
  faCog,
  faSignOutAlt,
  faBoxesStacked
} from '@fortawesome/free-solid-svg-icons';

import {
  faCalendar,
  faClock
} from '@fortawesome/free-regular-svg-icons';

// Interfaces
interface UserProfile {
  name: string;
  avatarUrl?: string;
}

@Component({
  selector: 'home-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  // ============================================
  // TODO: INYECCIÓN DE DEPENDENCIAS
  // ============================================
  private readonly router = inject(Router);

  // --------------------------------------------------------------------------
  // TODO: VIEW REFERENCES
  // --------------------------------------------------------------------------
  @ViewChild('menuCheckbox') menuCheckbox!: ElementRef<HTMLInputElement>;

  // --------------------------------------------------------------------------
  // TODO: SIGNALS DE ESTADO PRIVADOS
  // --------------------------------------------------------------------------
  private readonly scrolled = signal<boolean>(false);
  private readonly mobileMenuOpen = signal<boolean>(false);
  private readonly profileMenuOpen = signal<boolean>(false);

  // # Reemplazar con AuthService
  private readonly loggedIn = signal<boolean>(true);

  // # Reemplazar con UserService
  private readonly profile = signal< UserProfile | null >({
    name: 'Jean Haro',
    avatarUrl: 'assets/images/profile.jpg'
  })

  // --------------------------------------------------------------------------
  // TODO: COMPUTED SIGNALS PÚBLICOS
  // --------------------------------------------------------------------------
  readonly isScrolled = computed(() => this.scrolled());
  readonly isMobileMenuOpen = computed(() => this.mobileMenuOpen());
  readonly isProfileMenuOpen = computed(() => this.profileMenuOpen());
  readonly isLoggedIn = computed(() => this.loggedIn());
  readonly userProfile = computed(() => this.profile());

  // --------------------------------------------------------------------------
  // TODO: ICONOS (AGRUPADOS POR CATEGORÍA)
  // --------------------------------------------------------------------------s
  // Navigation Icons
  readonly faBoxesStacked: IconDefinition = faBoxesStacked;
  readonly faList: IconDefinition = faList;

  // Tool Icons
  readonly faCalendar: IconDefinition = faCalendar;
  readonly faClock: IconDefinition = faClock;

  // User Action Icons
  readonly faArrowRight: IconDefinition = faArrowRight;
  readonly faUser: IconDefinition = faUser;
  readonly faUserPlus: IconDefinition = faUserPlus;

  // Interface Icons
  readonly faChevronDown: IconDefinition = faChevronDown;
  readonly faCog: IconDefinition = faCog;
  readonly faSignOutAlt: IconDefinition = faSignOutAlt;

  // --------------------------------------------------------------------------
  // TODO: HOST LISTENERS
  // --------------------------------------------------------------------------
  // # Detectar scroll para la barra de navegación
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Establecer el estado de scrolled basado en la posición
    this.scrolled.set(scrollPosition > 50);

    // Cerrar ambos menús en cualquier evento de scroll
    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }

    if (this.isProfileMenuOpen()) {
      this.closeProfileMenu();
    }
  }

  // # Cerrar menú cuando se hace click fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick (event: MouseEvent): void {
    const target = event.target as HTMLElement;

     // Control para menú mobile
    if (
      this.isMobileMenuOpen() && (
        !target.closest('.header_menubar') &&
        !target.closest('.header_links') &&
        target.id !== 'menu-bar' ||
        target.closest('.header_links a')
      )
    ) {
      this.closeMobileMenu();;
    }

    // Control para menú de perfil
    if (this.isProfileMenuOpen() && !target.closest('.header_profile-container')) {
      this.closeProfileMenu();
    }
  }

  // --------------------------------------------------------------------------
  // TODO: MÉTODOS PÚBLICOS - MOBILE MENU
  // --------------------------------------------------------------------------
  // # Método para alternar el menu movil
  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(this.menuCheckbox.nativeElement.checked);
  }

  // # Método para cerrar el menú móvil
  closeMobileMenu(): void {
    if (this.menuCheckbox && this.menuCheckbox.nativeElement.checked) {
      this.menuCheckbox.nativeElement.checked = false;
      this.mobileMenuOpen.set(false);
    }
  }

  // --------------------------------------------------------------------------
  // TODO: MÉTODOS PÚBLICOS - PROFILE MENU
  // --------------------------------------------------------------------------
  // # Método para alternar el menú de perfil
  toggleProfileMenu (event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.profileMenuOpen.update(value => !value);
  }

  // # Método para cerrar el menú de perfil
  closeProfileMenu(): void {
    this.profileMenuOpen.set(false);
  }

  // --------------------------------------------------------------------------
  // TODO: MÉTODOS PÚBLICOS - USER ACTIONS
  // --------------------------------------------------------------------------
  // # Método para cerrar sesión
  logout(): void {
    // Implementar con AuthService real
    this.loggedIn.set(false);
    this.profileMenuOpen.set(false);
    this.router.navigate(['/auth/login']);
  }
}

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
  IconDefinition,
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
  // Servicios inyectados
  private router = inject(Router);

  @ViewChild('menuCheckbox')
  menuCheckbox!: ElementRef<HTMLInputElement>;

  // Señales para estado
  private scrolled = signal<boolean>(false);
  private mobileMenuOpen = signal<boolean>(false);
  private profileMenuOpen = signal<boolean>(false);
  private loggedIn = signal<boolean>(true); // Simulación - Reemplazar con AuthService
  private profile = signal< UserProfile | null >({
    name: 'Jean Haro',
    avatarUrl: 'assets/images/profile.jpg'
  }) // Simulación - Reemplazar con UserService

  // Señales computadas
  readonly isScrolled = computed(() => this.scrolled());
  readonly isMobileMenuOpen = computed(() => this.mobileMenuOpen());
  readonly isProfileMenuOpen = computed(() => this.profileMenuOpen());
  readonly isLoggedIn = computed(() => this.loggedIn());
  readonly userProfile = computed(() => this.profile());

  // Iconos
  readonly faList: IconDefinition = faList;
  readonly faCalendar: IconDefinition = faCalendar;
  readonly faClock: IconDefinition = faClock;
  readonly faArrowRight: IconDefinition = faArrowRight;
  readonly faUser: IconDefinition = faUser;
  readonly faUserPlus: IconDefinition = faUserPlus;
  readonly faChevronDown: IconDefinition = faChevronDown;
  readonly faCog: IconDefinition = faCog;
  readonly faSignOutAlt: IconDefinition = faSignOutAlt;
  readonly faBoxesStacked: IconDefinition = faBoxesStacked;

  // Detectar scroll para la barra de navegación
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

  // Cerrar menú cuando se hace click fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick (event: MouseEvent): void {
    const target = event.target as HTMLElement;

     // Control para menú móvil
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
    if (
      this.isProfileMenuOpen() &&
      !target.closest('.header_profile-container')
    ) {
      this.closeProfileMenu();
    }
  }

  // Método para cerrar el menú móvil
  closeMobileMenu(): void {
    if (this.menuCheckbox && this.menuCheckbox.nativeElement.checked) {
      this.menuCheckbox.nativeElement.checked = false;
      this.mobileMenuOpen.set(false);
    }
  }

  // Método para alternar el menu movil
  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(this.menuCheckbox.nativeElement.checked);
  }

  // Método para cerrar el menú de perfil
  closeProfileMenu(): void {
    this.profileMenuOpen.set(false);
  }

  // Método para alternar el menú de perfil
  toggleProfileMenu (event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.profileMenuOpen.update(value => !value);
  }

  // Método para cerrar sesión
  logout(): void {
    // Implementación real con AuthService
    this.loggedIn.set(false);
    this.profileMenuOpen.set(false);
    this.router.navigate(['/auth/login']);
  }
}

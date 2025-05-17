import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = signal<boolean>(false);

  // Propiedad computada para acceso readonlu
  // $ - se usa para indicar que es un Observable o valor reactivo
  // computed - crea un valor derivado que se actualiza automáticamente cuando cambia el signo original
  public darkMode$ = computed(() => this.darkMode());

  constructor() {
    // Inicializamos desde localStorage
    const savedTheme = localStorage.getItem('theme-wwlist');

    if (savedTheme === 'dark') {
      this.setDarkMode(true);
    } else {
      // Comprobar preferencias del sistema
      // matchMedia - es una API del navegador que permite detectar si una media query coincide con el estado actual del dispositivo
      // '(prefers-color-scheme: dark)' - es una media query que verifica si el usuario tiene activado el modo oscuro en su sistema operativo
      // matches - Es una propiedad booleana del objeto devuelto por matchMedia, devuelve true si la media query coincide con el modo dark
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (prefersDark) this.setDarkMode(true);
    }
  }

  toggleDarkmode(): void {
    this.setDarkMode(!this.darkMode());
  }

  setDarkMode (isDark: boolean): void {
    this.darkMode.set(isDark);

    (isDark) ? document.body.classList.add('dark-theme') : document.body.classList.remove('dark-theme');

    localStorage.setItem('theme-wwlist', isDark ? 'dark' : 'light')
  }
}

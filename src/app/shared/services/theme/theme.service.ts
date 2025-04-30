import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  public darkMode$ = this.darkMode.asObservable();

  constructor() {
    // Inicializamos desde localStorage
    const savedTheme = localStorage.getItem('theme-wwlist');

    if (savedTheme === 'dark') {
      this.setDarkMode(true);
    } else {
      // Comprobar preferencias del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (prefersDark) this.setDarkMode(true);
    }
  }

  toggleDarkmode(): void {
    this.setDarkMode(!this.darkMode.value);
  }

  setDarkMode (isDark: boolean): void {
    this.darkMode.next(isDark);

    (isDark) ? document.body.classList.add('dark-theme') : document.body.classList.remove('dark-theme');

    localStorage.setItem('theme-wwlist', isDark ? 'dark' : 'light')
  }
}

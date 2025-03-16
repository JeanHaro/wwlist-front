import { Component } from '@angular/core';

// Font Awesome
import { faMagnifyingGlass, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'home-shared-search',
  standalone: false,

  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  // Atributos
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;
}

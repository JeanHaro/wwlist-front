import { Component } from '@angular/core';

// FontAwesome
import {
  IconDefinition,
  faSquareFacebook,
  faSquareInstagram,
  faSquareGithub,
  faAngular,
  faNode
} from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'home-footer',
  standalone: false,

  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  // Atributos
  faSquareFacebook: IconDefinition = faSquareFacebook;
  faSquareInstagram: IconDefinition = faSquareInstagram;
  faSquareGithub: IconDefinition = faSquareGithub;
  faAngular: IconDefinition = faAngular;
  faNode: IconDefinition = faNode;

  year = new Date().getFullYear();
}

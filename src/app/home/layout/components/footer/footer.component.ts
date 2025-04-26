import { ChangeDetectionStrategy, Component } from '@angular/core';

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

  readonly year = new Date().getFullYear();
}

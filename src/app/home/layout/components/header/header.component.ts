import { Component } from '@angular/core';

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
@Component({
  selector: 'home-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faList: IconDefinition = faList;
  faCalendar: IconDefinition = faCalendar;
  faClock: IconDefinition = faClock;
  faArrowRight: IconDefinition = faArrowRight;
  faUser: IconDefinition = faUser;
  faUserPlus: IconDefinition = faUserPlus;
  faChevronDown: IconDefinition = faChevronDown;
  faCog: IconDefinition = faCog;
  faSignOutAlt: IconDefinition = faSignOutAlt;
  faBoxesStacked: IconDefinition = faBoxesStacked;
}
